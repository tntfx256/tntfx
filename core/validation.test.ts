import { FriendModel } from "./__mocks__/model";
import { Err } from "./error";
import type { FieldProps, FieldType } from "./field";
import { Field } from "./field";
import type { Any } from "./types";
import type { ValidationResult } from "./validation";
import { TypeValidator, Validator } from "./validation";

describe("Validation", () => {
  it("should validate types", () => {
    const testCases: Record<FieldType, Array<[Any, boolean, Partial<FieldProps>?]>> = {
      // ANY: [
      //   [1, true],
      //   [false, true],
      //   [null, true],
      //   [undefined, true],
      //   [{ name: "test" }, true],
      // ],
      BOOLEAN: [
        [0, true],
        [1, true],
        [true, true],
        [false, true],
        ["false", false],
        ["", false],
      ],
      ENUM: [
        ["test", true, { enum: ["test", "another"] }],
        ["invalid", false, { enum: ["test", "another"] }],
        [null, false, { enum: ["test", "another"] }],
        [12, false, { enum: ["test", "another"] }],
      ],
      LIST: [
        ["", false],
        [null, false],
        [{ 1: 1 }, false],
        [[], true],
        [["test", 12, true, {}], true],
        [[0, true], true],
      ],
      NUMBER: [
        [0, true],
        ["0", false],
        [-5.456, true],
        [NaN, false],
        [undefined, false],
      ],
      OBJECT: [
        [{ name: "t" }, true],
        [{}, true],
        [123, false],
        [true, false],
      ],
      STRING: [
        ["", true],
        ["123", true],
        ["asd", true],
        [123, false],
      ],
      TIMESTAMP: [],
    };

    for (const [type, tests] of Object.entries(testCases)) {
      for (const [value, result, props] of tests) {
        expect(TypeValidator[type as FieldType](value, new Field("name", { type: type as FieldType, ...props }))).toBe(
          result
        );
      }
    }
  });

  it("should validate based on field props", () => {
    const testCases: Array<{ field: Field; tests: Array<[rule: keyof FieldProps, value: Any, result: ValidationResult]> }> =
      [
        {
          field: new Field("age", { listType: "NUMBER", type: "LIST" }),
          tests: [
            ["type", "test", false],
            ["type", [1, "test", true], true],
            ["listType", [1, "test", true], "age.[1]"],
          ],
        },

        {
          field: new Field("level", { enum: ["first", "second", "third"], listType: "ENUM", type: "LIST" }),
          tests: [
            ["type", "test", false],
            ["type", ["first", "test"], true],

            ["listType", ["first", true], "level.[1]"],
            ["listType", ["first", "test", true], "level.[1]"],
            ["listType", ["first", 1, true], "level.[1]"],
            ["listType", ["first", "second"], true],
          ],
        },

        {
          field: new Field("friends", { listType: "OBJECT", model: FriendModel, type: "LIST" }),
          tests: [
            ["type", "test", false],
            ["type", {}, false],
            ["type", null, false],
            ["type", ["first"], true],
            ["type", [{}], true],
            ["type", [], true],

            ["listType", ["first", {}], "friends.[0]"],
            ["listType", [{}, null], true],
            ["listType", [{ name: "first" }, {}], true],
            ["listType", [{ name: "first" }, { name: 12 }], true],

            ["model", [{}, null], ["friends.[0].name", Err.Message.VALUE_REQUIRED]],
            ["model", [{ name: "first" }, {}], ["friends.[1].name", Err.Message.VALUE_REQUIRED]],
            ["model", [{ name: "first" }, { name: 12 }], ["friends.[1].name", Err.Message.VALUE_INVALID]],
            ["model", [{ heros: ["batman", 123], name: "first" }], ["friends.[0].heros.[1]", Err.Message.VALUE_INVALID]],
          ],
        },

        {
          field: new Field("friends", { listType: "OBJECT", model: FriendModel, required: true, type: "LIST" }),
          tests: [["required", [], false]],
        },
      ];

    for (const { field, tests } of testCases) {
      for (const [rule, value, result] of tests) {
        expect(Validator[rule](value, field)).toStrictEqual(result);
      }
    }
  });
});
