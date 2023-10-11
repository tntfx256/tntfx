import type { ErrorMessages } from "./error";
import type { Field, FieldProps, FieldType } from "./field";
import type { Any, OBJECT } from "./types";
import { getFirstPair } from "./utils/etc";

export const EmptyValues = [undefined, null, ""];

export type ValidationResult = boolean | string | [name: string, rule: ErrorMessages];
// type ValidationResult = boolean | { name: string; rule?: ValidationRules };
export type AssertValidator = (value: Any, field: Field) => ValidationResult;

type ValidatorFn = (value: Any, field: Field) => ValidationResult;

export const TypeValidator: Record<FieldType, ValidatorFn> = {
  // ANY: () => true,
  BOOLEAN: (value: Any) => [0, 1, true, false].includes(value),
  ENUM: (value: Any, field: Field) => field.props.enum!.includes(value),
  LIST: (value: Any) => Array.isArray(value),
  NUMBER: (value: Any) => !isNaN(value) && typeof value === "number",
  OBJECT: (value: Any) => typeof value === "object",
  STRING: (value: Any) => typeof value === "string",
  TIMESTAMP: (value: Any, field: Field) => TypeValidator.NUMBER(value, field),
};

export const Validator: Record<keyof FieldProps, ValidatorFn> = {
  assert(value: Any, field: Field) {
    const { props } = field;
    return props.assert!(value, field);
  },

  enum(value: Any, field: Field) {
    const { name, props } = field;

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? value.map((v, i) => (props.enum!.includes(v) ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
        : false;
    }

    return props.enum!.includes(value);
  },

  length(value: string, field: Field) {
    const { name, props } = field;

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? value.map((v, i) => (v.length == props.length! ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
        : false;
    }

    return value.length == props.length!;
  },

  listLength(value: string, field: Field) {
    const { props } = field;
    return props.type === "LIST" && Array.isArray(value) && value.length == props.listLength!;
  },

  listMaxLength(value: string, field: Field) {
    const { props } = field;
    return props.type === "LIST" && Array.isArray(value) && value.length <= props.listMaxLength!;
  },

  listMinLength(value: string, field: Field) {
    const { props } = field;
    return props.type === "LIST" && Array.isArray(value) && value.length >= props.listMinLength!;
  },

  listType(value: Any[], field: Field) {
    const { name, props } = field;
    return (
      value.map((v, i) => (TypeValidator[props.listType!](v, field) ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
    );
  },

  max(value: number, field: Field) {
    const { name, props } = field;

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? value.map((v, i) => (v <= props.max! ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
        : false;
    }
    return value <= props.max!;
  },

  maxLength(value: string, field: Field) {
    const { name, props } = field;

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? value.map((v, i) => (v.length <= props.maxLength! ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
        : false;
    }

    return value.length <= props.maxLength!;
  },

  min(value: number, field: Field) {
    const { name, props } = field;

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? value.map((v, i) => (v >= props.min! ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
        : false;
    }

    return value >= props.min!;
  },

  minLength(value: string, field: Field) {
    const { name, props } = field;

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? value.map((v, i) => (v.length >= props.minLength! ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
        : false;
    }

    return value.length >= props.minLength!;
  },

  model(value: Any, field: Field) {
    const { name, props } = field;
    const model = new props.model!();

    // null is object
    if (!value) return false;

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? ((value
            .map((v, i) => {
              // null is object
              if (!v) return `${name}.[${i}]`;

              model.setValues(v, true);
              const violations = model.validate();
              if (!violations) return null;

              const pair = getFirstPair(violations);
              return [`${name}.[${i}].${pair.key}`, pair.value];
            })
            .filter(Boolean)[0] || true) as ValidationResult)
        : false;
    }

    model.setValues(value, true);
    const violations = model.validate();
    if (!violations) return true;

    const pair = getFirstPair(violations);
    return [`${name}.${pair.key}`, pair.value];
  },

  pattern(value: Any, field: Field) {
    const { name, props } = field;
    const regex = new RegExp(props.pattern!);

    if (props.type === "LIST") {
      return Array.isArray(value)
        ? value.map((v, i) => (regex.test(v) ? null : `${name}.[${i}]`)).filter(Boolean)[0] || true
        : false;
    }

    return regex.test(value);
  },

  required(value: Any, field: Field) {
    const { props } = field;
    if (!props.required) return true;

    if (props.type === "LIST") return Array.isArray(value) && value.length > 0;
    if (props.type === "OBJECT") return value && typeof value == "object" && Object.keys(value).length > 0;

    return !EmptyValues.includes(value);
  },

  type(value: Any, field: Field) {
    const { props } = field;
    return TypeValidator[props.type](value, field);
  },
};

export type Violations = OBJECT<string>;
export type ValidationRules = keyof FieldProps | "unknown";

export const Regex = {
  ALPHA: /^[a-zA-Z]+$/,
  ALPHA_NUM: /^[a-zA-Z0-9]+$/,
  EMAIL: /^\S+@\S+\.\S+$/,
  FILE_NAME: /^(\w+[^\\/]*){1,64}$/,
  NUM: /^[0-9]+$/,
  USERNAME: /^[a-z][a-z0-9_.-]{3,12}$/i,
  VERIFICATION_CODE: /^[0-9A-Z]{6}$/,
};

export function needsValidation(field: Field, value: Any) {
  return field.props.required || typeof value !== "undefined";
}
