import type { ZodError as ZodErrors } from "zod";
import { logger } from "./logger";
import type { Any, TError } from "./types";

const errorNames = {
  ACCESS: "err_access",
  CLIENT: "err_client",
  FS: "err_fs",
  RUNTIME: "err_runtime",
  SERVER: "err_server",
  UNKNOWN: "err_unknown",
  VALIDATION: "err_validation",
} as const;
export type ErrorNames = (typeof errorNames)[keyof typeof errorNames];

const errorMessages = {
  ACCESS_DENIED: "access_denied",
  ALREADY_EXISTS: "already_exists",
  ASSERTION_FAILURE: "assertion_failure",
  INVALID_OPERATION: "invalid_operation",
  NOT_ACCEPTABLE: "not_acceptable",
  NOT_FOUND: "not_found",
  INVALID: "value_invalid",
  REQUIRED: "value_required",
  INVALID_LENGTH: "invalid_length",
  TOO_HIGH: "value_too_high",
  TOO_LOW: "value_too_low",
  TOO_LONG: "value_too_long",
  TOO_SHORT: "value_too_short",
  UNKNOWN_ERROR: "unknown_error",
} as const;
export type ErrorMessages = (typeof errorMessages)[keyof typeof errorMessages];

export const validationErrorMessages = {
  assert: () => errorMessages.ASSERTION_FAILURE,

  enum: () => errorMessages.INVALID,

  length: () => errorMessages.INVALID_LENGTH,

  listLength: () => errorMessages.INVALID_LENGTH,

  listMaxLength: () => errorMessages.TOO_LONG,

  listMinLength: () => errorMessages.TOO_SHORT,

  listType: () => errorMessages.INVALID,
  // assert: (n: string) => `assertion check has failed for ${n}`,
  max: () => errorMessages.TOO_HIGH,
  maxLength: () => errorMessages.TOO_LONG,
  min: () => errorMessages.TOO_LOW,
  minLength: () => errorMessages.TOO_SHORT,
  model: () => errorMessages.INVALID,
  pattern: () => errorMessages.INVALID,
  required: () => errorMessages.REQUIRED,
  type: () => errorMessages.INVALID,
  unknown: () => errorMessages.UNKNOWN_ERROR,
};

const possibleProperties = ["status", "code", "violations", "description"] as Array<keyof SerializableError>;
if (process.env.NODE_ENV === "development") {
  possibleProperties.push("stack");
}

export class SerializableError extends Error {
  public $$name = "SerializableError";
  // public violations?: Violations;
  public status?: number;
  public code?: ErrorMessages;
  public description?: string;
  public stack?: string;

  constructor(message?: ErrorMessages, name?: ErrorNames, description?: string) {
    super(message || errorMessages.UNKNOWN_ERROR);
    this.name = name || errorNames.UNKNOWN;
    this.description = description || "";
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
  return new SerializableError(message, name, description || "");
}

export function finalizeError(rawError: TError): SerializableError {
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
  } catch (err) {
    logger.error("[finalizeError]", err);
  }

  return error;
}

export type Violation<T> = { [key in keyof T]: ErrorMessages };
function izZodError<T>(error: ZodErrors<T> | Violation<T>): error is ZodErrors<T> {
  return error && typeof error === "object" && (error as Any).issues;
}

export class ValidationError<T = Any> extends SerializableError {
  public violations: Violation<T>;

  constructor(violations: Violation<T>) {
    super(errorMessages.INVALID, errorNames.VALIDATION);
    if (izZodError(violations)) {
      this.violations = violations.issues.reduce((acc: Any, issue) => {
        acc[issue.path.join(".")] = issue.message;
        return acc;
      }, {} as Violation<T>);
    } else {
      this.violations = violations;
    }
  }
}

// export function getViolationMessage(field: Field, rule: ValidationRules) {
//   return validationErrorMessages[rule](field.name, rule === "unknown" ? "" : field.props[rule]);
// }

export function isSerializableError(error: TError): error is SerializableError {
  return !!(error && typeof error === "object" && (error as Any).$$name === "SerializableError");
}

export function Err(name: ErrorNames, message: ErrorMessages, description?: string) {
  return createError(name, message, description);
}
Err.Name = errorNames;
Err.Message = errorMessages;
Err.finalize = finalizeError;
