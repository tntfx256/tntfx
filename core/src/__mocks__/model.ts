import { Field } from "../field";
import { Model } from "../model";

export class FriendModel extends Model {
  static fields = {
    heros: new Field("heros", { listType: "STRING", type: "LIST" }),
    name: new Field("name", { maxLength: 8, minLength: 2, required: true, type: "STRING" }),
  };
}

export class TestModel extends Model {
  static fields = {
    age: new Field("age", { max: 42, min: 18, required: true, type: "NUMBER" }),
    friends: new Field("friends", { listType: "OBJECT", model: FriendModel, type: "LIST" }),
    hero: new Field("hero", { enum: ["DeadPool", "IronMan", "Venom"], type: "ENUM" }),
    name: new Field("name", { maxLength: 8, minLength: 2, required: true, type: "STRING" }),
  };
}
