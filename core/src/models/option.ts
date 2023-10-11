import { Field } from "../field";
import { Model } from "../model";
import type { Option } from "../types";

export class OptionModel extends Model<Option> {
  static get fields() {
    return {
      id: new Field("id", { minLength: 1, required: true, type: "STRING" }),
      title: new Field("title", { minLength: 1, required: true, type: "STRING" }),
    };
  }

  static convert(values: Readonly<string[]> | string[]): Option[] {
    return values.map((v) => ({ id: v, title: v }));
  }
}
