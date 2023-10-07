import { Err } from "./error";
import { Field } from "./field";

describe("field", () => {
  it("should validate the field", () => {
    const field = new Field("name", { maxLength: 6, minLength: 2, type: "STRING" });

    let value = "a";
    expect(field.validate(value)).toStrictEqual([Err.Message.VALUE_TOO_SHORT]);

    value = "abcdefgh";
    expect(field.validate(value)).toStrictEqual([Err.Message.VALUE_TOO_LONG]);

    value = "abcde";
    expect(field.validate(value)).toBeNull();
  });

  it("should validate the list", () => {
    const field = new Field("name", { listType: "STRING", maxLength: 6, minLength: 2, type: "LIST" });

    const value = "a";
    expect(field.validate(value)).toStrictEqual([Err.Message.VALUE_INVALID]);

    let list = ["abc", "abcdefgh"];
    expect(field.validate(list)).toStrictEqual([Err.Message.VALUE_TOO_LONG, "name.[1]"]);

    list = ["abcde", "abc"];
    expect(field.validate(list)).toBeNull();
  });
});
