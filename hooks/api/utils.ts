import type { Any, ERROR } from "@tntfx/core";
import { Err, finalizeError } from "@tntfx/core";
import type { FailedResponse, ParsedResponse, RequestState, SuccessResponse } from "./types";

export function createInitialState(): RequestState<null> {
  return { data: null, error: null, isLoading: false, response: null };
}

export function createErrorState<T>(error: ERROR, status?: number, statusText?: string): RequestState<T> {
  return {
    data: null,
    error: finalizeError(error),
    isLoading: false,
    response: { status: status || 500, statusText: statusText || "Server Error" },
  };
}

export function createSuccessState<T>(data: T, status: number, statusText: string): RequestState<T> {
  return { data, error: null, isLoading: false, response: { status, statusText } };
}

export function parseResponse<T = Any>(result: RequestState<T>): ParsedResponse<T> {
  const { data, error, response } = result;
  const hasError = Boolean(error);

  return hasError
    ? ({ data: null, error, response } as FailedResponse)
    : ({ data, error: null, response } as SuccessResponse<T>);
}

export function isParsedResponse(response: ParsedResponse<Any> | unknown): response is ParsedResponse<Any> {
  return !!response && typeof response === "object" && "data" in response && "hasError" in response;
}

export function createAxiosErrorState<T>(error: Any): RequestState<T> {
  if (error.response) {
    const { data, status, statusText } = error.response;
    return createErrorState<T>(data, status, statusText);
  }

  if (error.request) {
    const { status, statusText } = error.request;
    return createErrorState<T>(Err(Err.Name.CLIENT, Err.Message.UNKNOWN_ERROR), status, statusText);
  }

  return createErrorState<T>(error);
}
