import { finalizeError } from "@tntfx/core";
import type { AxiosHeaders, AxiosRequestConfig } from "axios";
import axios from "axios";

type AxiosRequest<D> = Pick<
  AxiosRequestConfig<D>,
  "baseURL" | "url" | "method" | "timeout" | "signal" | "onUploadProgress" | "onDownloadProgress"
>;

export type RequestOptions<D = object> = AxiosRequest<D> & {
  body?: D;
  prepareHeaders?: (headers: AxiosHeaders) => Promise<void>;
};

export async function request<T, D = unknown>(options: RequestOptions<D>): Promise<T> {
  const { body, prepareHeaders, ...axiosConfig } = options;
  try {
    const { data } = await axios({
      ...axiosConfig,
      data: body,
      async transformRequest(data, headers) {
        if (prepareHeaders) {
          try {
            await prepareHeaders(headers);
          } catch {}
        }
        return data;
      },
    });
    return data;
  } catch (error) {
    throw finalizeError(error);
  }
}
