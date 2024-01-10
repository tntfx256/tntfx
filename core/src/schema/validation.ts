import type { ErrorMessages } from "../error";
import type { Field } from "../schema/field";
import type { Any } from "../types";

export type ValidationResult = boolean | string | [name: string, rule: ErrorMessages];
export type AssertValidator = (value: Any, field: Field) => ValidationResult;

export const Regex = {
  ALPHA: /^[a-zA-Z]+$/,
  ALPHA_NUM: /^[a-zA-Z0-9]+$/,
  EMAIL: /^\S+@\S+\.\S+$/,
  FILE_NAME: /^(\w+[^\\/]*){1,64}$/,
  NUM: /^[0-9]+$/,
  USERNAME: /^[a-z][a-z0-9_.-]{3,12}$/i,
  VERIFICATION_CODE: /^[0-9A-Z]{6}$/,
};
