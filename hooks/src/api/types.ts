import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { Any, MaybePromise, Nullable, SerializableError } from "@tntfx/core";
import type { AxiosHeaders, AxiosProgressEvent, Method } from "axios";
import type { Variables as V } from "graphql-request";
import type { AsyncOperation } from "../use-status";

// REQUEST
// ----------------
export type ResponseStatus = { status: number; statusText: string };
export type PrepareHeaders = (headers: AxiosHeaders) => Promise<void>;
export type Transform<T, D = Any> = (data: D) => MaybePromise<T>;

export type RequestConfig<T> = { url?: string; method?: Method; transform?: Transform<T> };

export type RequestOptions<T, U> = RequestConfig<T> & {
  baseUrl?: string;
  body?: U | undefined;
  prepareHeaders?: PrepareHeaders;
  onProgress?: (progress: AxiosProgressEvent) => void;
  controller?: AbortController;
};

export type RequestState<T> = AsyncOperation<T> & {
  response: Nullable<ResponseStatus>;
};

export type UseRequest<T, U> = [
  (options?: RequestOptions<T, U>) => Promise<RequestState<T>>,
  RequestState<T>,
  AbortController,
];

export type { V };
export type GqlResult<T, K> = K extends keyof T ? T[K] : T;
export type GqlRequestConfig<T, U, K extends undefined | keyof T> = {
  document: TypedDocumentNode<T, U>;
  key?: K;
  transform?: Transform<T>;
};

export type GqlRequestOptions<T, U> = {
  body?: U;
  prepareHeaders?: PrepareHeaders;
  transform?: Transform<T>;
  onProgress?: (progress: AxiosProgressEvent) => void;
  controller?: AbortController;
};

export type UseGqlRequest<T, U, K extends undefined | keyof T> = [
  (options?: GqlRequestOptions<T, U>) => Promise<RequestState<GqlResult<T, K>>>,
  RequestState<GqlResult<T, K>>,
  AbortController,
];

// RESPONSE
// ----------------
export type FailedResponse = {
  data: null;
  error: SerializableError;
  response: Nullable<ResponseStatus>;
};

export type SuccessResponse<T> = {
  data: T;
  error: null;
  response: Nullable<ResponseStatus>;
};

export type ParsedResponse<T> = FailedResponse | SuccessResponse<T>;
