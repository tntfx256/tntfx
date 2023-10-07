import type { Field } from "./field";
import { logger } from "./logger";
import type { Any, ERROR } from "./types";
import type { ValidationRules, Violations } from "./validation";

export const errorNames = {
  ACCESS: "ERR_ACCESS",
  CLIENT: "ERR_CLIENT",
  FS: "ERR_FS",
  RUNTIME: "ERR_RUNTIME",
  SERVER: "ERR_SERVER",
  UNKNOWN: "ERR_UNKNOWN",
  VALIDATION: "ERR_VALIDATION",
};
export type ErrorNames = (typeof errorNames)[keyof typeof errorNames];

export const errorMessages = {
  ACCESS_DENIED: "ACCESS_DENIED",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  ASSERTION_FAILURE: "ASSERTION_FAILURE",
  CODE_EXPIRED: "CODE_EXPIRED",
  CODE_MISMATCH: "CODE_MISMATCH",
  INVALID_LENGTH: "INVALID_LENGTH",
  INVALID_OPERATION: "INVALID_OPERATION",
  ITEMS_COUNT_INVALID: "ITEMS_COUNT_INVALID",
  ITEMS_COUNT_TOO_HIGHT: "ITEMS_COUNT_TOO_HIGHT",
  ITEMS_COUNT_TOO_LOW: "ITEMS_COUNT_TOO_LOW",
  MISSING_VERIFICATION_CODE: "MISSING_VERIFICATION_CODE",
  NOT_ACCEPTABLE: "NOT_ACCEPTABLE",
  NOT_FOUND: "NOT_FOUND",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  VALIDATION: "VALIDATION_ERROR",
  VALUE_INVALID: "VALUE_INVALID",
  VALUE_REQUIRED: "VALUE_REQUIRED",
  VALUE_TOO_HIGH: "VALUE_TOO_HIGH",
  VALUE_TOO_LONG: "VALUE_TOO_LONG",
  VALUE_TOO_LOW: "VALUE_TOO_LOW",
  VALUE_TOO_SHORT: "VALUE_TOO_SHORT",
};
export type ErrorMessages = (typeof errorMessages)[keyof typeof errorMessages];

export const validationErrorMessages: Record<ValidationRules, (...args: Any[]) => string> = {
  assert: () => errorMessages.ASSERTION_FAILURE,

  enum: () => errorMessages.VALUE_INVALID,

  length: () => errorMessages.INVALID_LENGTH,

  listLength: () => errorMessages.ITEMS_COUNT_INVALID,

  listMaxLength: () => errorMessages.ITEMS_COUNT_TOO_HIGHT,

  listMinLength: () => errorMessages.ITEMS_COUNT_TOO_LOW,

  listType: () => errorMessages.VALUE_INVALID,
  // assert: (n: string) => `assertion check has failed for ${n}`,
  max: () => errorMessages.VALUE_TOO_HIGH,
  maxLength: () => errorMessages.VALUE_TOO_LONG,
  min: () => errorMessages.VALUE_TOO_LOW,
  minLength: () => errorMessages.VALUE_TOO_SHORT,
  model: () => errorMessages.VALUE_INVALID,
  pattern: () => errorMessages.VALUE_INVALID,
  required: () => errorMessages.VALUE_REQUIRED,
  type: () => errorMessages.VALUE_INVALID,
  unknown: () => errorMessages.UNKNOWN_ERROR,
};

const possibleProperties = ["status", "code", "violations", "description"] as Array<keyof SerializableError>;
if (process.env.NODE_ENV === "development") {
  possibleProperties.push("stack");
}
export class SerializableError extends Error {
  public $$name = "SerializableError";
  public originalName?: string;
  public violations?: Violations;
  public status?: number;
  public code?: string;
  public description?: string;

  constructor(message = errorMessages.UNKNOWN_ERROR, name = errorNames.UNKNOWN, description = "") {
    super(message);
    this.name = name;
    this.description = description;
  }

  public toJSON() {
    const json: Any = { message: this.message, name: this.name };
    for (const p of possibleProperties) {
      if (this[p]) {
        json[p] = this[p];
      }
    }
    return json;
  }
}

export function createError(name: ErrorNames, message: ErrorMessages, description?: string): SerializableError {
  return new SerializableError(message, name, description);
}

export function finalizeError(rawError: ERROR): SerializableError {
  if (isSerializableError(rawError)) {
    return rawError;
  }

  let error = new SerializableError();
  if (!rawError) {
    return error;
  }

  if (typeof rawError === "string") {
    error.message = rawError;
    return error;
  }

  // GraphQLError
  if (Array.isArray((error as Any).errors)) {
    return finalizeError((error as Any).errors[0]);
  }
  if ((rawError as Any).originalError) {
    return finalizeError((rawError as Any).originalError);
  }
  if ((rawError as Any).extensions) {
    return finalizeError((rawError as Any).extensions);
  }

  const data = (rawError as Any).data;
  if (data) {
    return finalizeError(data);
  }

  try {
    const propsToCheck = [["message"], ["error", "message"], ["name"], ["status"], ["code"], ["stack"], ["violations"]];
    for (const [prop, to] of propsToCheck) {
      if (prop in (rawError as Any) && (rawError as Any)[prop] !== undefined) {
        (error as Any)[to || prop] = (rawError as Any)[prop];
      }
    }

    if (error.name && !Object.values(errorNames).includes(error.name.toUpperCase())) {
      error.originalName = error.name;
      error.name = errorNames.UNKNOWN;
    }
  } catch (err) {
    logger.error("[finalizeError]", err);
  }

  return error;
}

export class ValidationError extends SerializableError {
  constructor(violations: Violations) {
    super(errorMessages.VALIDATION, errorNames.VALIDATION);
    this.violations = violations;
  }
}

export function getViolationMessage(field: Field, rule: ValidationRules) {
  return validationErrorMessages[rule](field.name, rule === "unknown" ? "" : field.props[rule]);
}

export function isSerializableError(error: ERROR): error is SerializableError {
  return !!(error && typeof error === "object" && (error as Any).$$name === "SerializableError");
}

export function getNestedErrors(errors: Violations, prefix: string): Violations {
  return Object.keys(errors).reduce((acc, name) => {
    if (name.startsWith(prefix)) {
      return { ...acc, [name.replace(prefix, "")]: errors[name] };
    }
    return acc;
  }, {});
}

export function Err(name: ErrorNames, message: ErrorMessages, description?: string) {
  return createError(name, message, description);
}
Err.Name = errorNames;
Err.Message = errorMessages;
Err.finalize = finalizeError;
