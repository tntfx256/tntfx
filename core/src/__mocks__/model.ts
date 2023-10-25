import { Field } from "../field";
import { Model } from "../model";

export class FriendModel extends Model {
  static fields = {
    heros: new Field("heros", { listType: "String", type: "List" }),
    name: new Field("name", { maxLength: 8, minLength: 2, required: true, type: "String" }),
  };
}

export class TestModel extends Model {
  static fields = {
    age: new Field("age", { max: 42, min: 18, required: true, type: "Number" }),
    friends: new Field("friends", { listType: "Object", model: FriendModel, type: "List" }),
    hero: new Field("hero", { enum: ["DeadPool", "IronMan", "Venom"], type: "Enum" }),
    name: new Field("name", { maxLength: 8, minLength: 2, required: true, type: "String" }),
  };
}
