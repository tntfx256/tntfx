import type { ModelConstructor } from "./model";
import type { AssertValidator } from "./validation";
import type { EnumString } from "../types";

export enum FieldType {
  Any = "Any",
  Boolean = "Boolean",
  Enum = "Enum",
  List = "List",
  Number = "Number",
  Object = "Object",
  String = "String",
  Timestamp = "Timestamp",
}

export type FieldProps<T extends EnumString<FieldType> = FieldType> = {
  type: T;
  required?: true;
  listType?: FieldType;
  listLength?: number;
  listMinLength?: number;
  listMaxLength?: number;
  length?: number;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  enum?: ReadonlyArray<string>;
  pattern?: RegExp;
  model?: ModelConstructor;
  assert?: AssertValidator;
};

export class Field<N extends string = string, T extends FieldType = FieldType> {
  name: N;
  props: FieldProps<T>;

  constructor(name: N, props: FieldProps<T>) {
    this.name = name;
    this.props = props;
  }
}

// export type Fields<I extends TObject = TObject> = { [N in StringKeys<I>]: Field<N> };

// type ConstructorArg<T extends TObject = TObject> = ZodSchema<T> | Fields<T>;

// function isSchema<T extends TObject = TObject>(arg: ConstructorArg<T>): arg is ZodSchema<T> {
//   return typeof arg === "object" && (arg as Any).parse !== undefined;
// }

// function convertFieldsToSchema<T extends TObject = TObject>(fields: Fields<T>): ZodSchema<T> {
//   const schema = {} as ZodSchema<T>;
//   // for (const [name, field] of Object.entries(fields)) {
//   //   schema[name] = field.props;
//   // }
//   return schema;
// }
