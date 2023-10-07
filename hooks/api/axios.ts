import type { AxiosInstance, AxiosResponse } from "axios";
import axios, { AxiosHeaders } from "axios";
import type { RequestOptions, RequestState } from "./types";
import { createAxiosErrorState, createSuccessState } from "./utils";

const client: AxiosInstance = axios.create({
  timeout: 60_000,
  maxRedirects: 5,
});

export async function request<T, U>(options: RequestOptions<T, U>): Promise<RequestState<T>> {
  const requestURL = [options.baseUrl, options.url].filter(Boolean).join("/");

  let headers: AxiosHeaders = new AxiosHeaders();
  const appendExtraHeaders = options?.prepareHeaders;
  if (appendExtraHeaders) {
    await appendExtraHeaders(headers);
  }

  try {
    let { data, status, statusText } = await client.request<T, AxiosResponse<T>, U>({
      headers,
      url: requestURL.toString(),
      method: options.method,
      data: options?.body,
      onUploadProgress: options?.onProgress,
      onDownloadProgress: options?.onProgress,

      signal: options.controller?.signal,
    });

    if (options?.transform) {
      data = await options.transform(data);
    }

    return createSuccessState(data, status, statusText);
  } catch (error) {
    return createAxiosErrorState<T>(error);
  }
}
