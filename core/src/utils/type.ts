import type { Any, TObject } from "../types";

export function assertObject(value: Any): value is Object {
  return value && typeof value === "object";
}

export function isObject(value: Any): value is TObject {
  return value && typeof value === "object" && !Array.isArray(value);
}

// export function assertValue<T = Any>(value: T, ...fields: string[]): asserts value is NonNullable<T> {
//   if (EmptyValues.includes(value as Any)) {
//     throw Err(Err.Name.VALIDATION, Err.Message.VALUE_REQUIRED);
//   }

//   if (fields.length) {
//     const missingFields = fields.filter(
//       (field) => assertObject(value) && field in (value as Any) && !EmptyValues.includes((value as Any)[field])
//     );
//     if (missingFields.length) {
//       throw Err(Err.Name.VALIDATION, Err.Message.VALUE_REQUIRED, `MISSING_FIELDS ${missingFields}`);
//     }
//   }
// }
