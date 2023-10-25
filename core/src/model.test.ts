import { FriendModel, TestModel } from "./__mocks__/model";
import { Err } from "./error";
import { Field } from "./field";
import { Model } from "./model";

describe("Model", () => {
  it("should extends the model based on static fields", () => {
    const model = new TestModel();

    expect(model.fieldNames).toHaveLength(4);
    model.setValues({ age: 12, hero: "Hulk", invalid: 14, name: "first" });

    const values = model.getValues();
    expect(values).toEqual({ age: 12, hero: "Hulk", name: "first" });
  });

  it("should get values of the nested objects", () => {
    const model = new TestModel();

    model.setValues({
      age: 12,
      extraData: { invalid: true },
      friends: [
        { invalidProp: 123, name: "first" },
        { heros: ["Batman", 16], name: "second" },
      ],
      hero: "Venom",
      name: "test",
    });

    const value = model.getValues();
    expect(value).toEqual({
      age: 12,
      friends: [{ name: "first" }, { heros: ["Batman", 16], name: "second" }],
      hero: "Venom",
      name: "test",
    });

    const violations = model.validate();

    expect(violations).toEqual({ age: Err.Message.VALUE_TOO_LOW, "friends.[1].heros.[1]": Err.Message.VALUE_INVALID });
  });

  it("should return correct validation for required list of objects", () => {
    const model = new Model();
    model.extend({
      friends: new Field("friends", { listType: "Object", model: FriendModel, required: true, type: "List" }),
    });

    model.setValues({}, true);
    expect(model.validate()).toEqual({ friends: Err.Message.VALUE_REQUIRED });

    model.setValues({ friends: [] }, true);
    expect(model.validate()).toEqual({ friends: Err.Message.VALUE_REQUIRED });

    model.setValues({ friends: [null] }, true);
    expect(model.validate()).toEqual({ friends: Err.Message.VALUE_REQUIRED });
  });
});
