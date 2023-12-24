import type { Any } from "@tntfx/core";
import type { ParsedResponse } from "./types";

// export function createInitialState(): RequestState<null> {
//   return { ...createInitialState(), response: null };
// }

// export function parseResponse<T = Any>(result: RequestState<T>): ParsedResponse<T> {
//   const { data, error, response } = result;
//   const hasError = Boolean(error);

//   return hasError
//     ? ({ data: null, error, response } as FailedResponse)
//     : ({ data, error: null, response } as SuccessResponse<T>);
// }

export function isParsedResponse(response: ParsedResponse<Any> | unknown): response is ParsedResponse<Any> {
  return !!response && typeof response === "object" && "data" in response && "hasError" in response;
}
