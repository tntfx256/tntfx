import { finalizeError, getViolationMessage } from "./error";
import type { ModelConstructor } from "./model";
import type { Any, Nullable, StringKeys, Types } from "./types";
import type { AssertValidator } from "./validation";
import { needsValidation, Validator } from "./validation";

export type FieldType = StringKeys<Types>;

type FieldValidationResult = [error: string, fieldName?: string];

export type FieldProps = {
  required?: true;
  type: FieldType;
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

const rulesValidationOrder: (keyof FieldProps)[] = [
  "required",
  "type",
  "listType",
  "model",
  "assert",
  "enum",
  "length",
  "minLength",
  "maxLength",
  "listLength",
  "listMinLength",
  "listMaxLength",
  "min",
  "max",
  "pattern",
];

export class Field<N extends string = string> {
  constructor(
    public name: N,
    public props: FieldProps = { type: "String" }
  ) {}

  validate(value: Any): Nullable<FieldValidationResult> {
    return Field.validate(this, value);
  }

  static validate(field: Field, value: Any): Nullable<FieldValidationResult> {
    if (!needsValidation(field, value)) return null;

    try {
      for (const rule of rulesValidationOrder) {
        if (rule in field.props) {
          const result = Validator[rule](value, field);
          if (result === true) continue;
          // has error
          if (result === false) return [getViolationMessage(field, rule)];
          if (Array.isArray(result)) return [result[1], result[0]];
          return [getViolationMessage(field, rule), result];
        }
      }
    } catch (err) {
      return [finalizeError(err).message];
    }

    return null;
  }
}
