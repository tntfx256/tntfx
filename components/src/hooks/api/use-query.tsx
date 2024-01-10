import { useCallback, useState } from "react";
import type { QueryFunction, UseQueryOptions as UseQueryOptionsLib } from "@tanstack/react-query";
import { useQuery as useQueryLib } from "@tanstack/react-query";
import type { Any, DeepPartial, Nullable, SerializableError } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { type ApiConfig, useApiConfig } from "./api-provider";

type UseQueryOptionsBase<T, U = T> = UseQueryOptionsLib<T, SerializableError, U> & {
  fetcherConfig?: AxiosRequestConfig<ApiConfig>;
};

type QueryBuilder<T, U = T> = (
  options: UseQueryOptionsBase<T, U>,
  config: ApiConfig
) => DeepPartial<UseQueryOptionsBase<T, U>>;

type UseQueryOptions<T, U = T, L extends Boolean = false> = UseQueryOptionsBase<T, U> & { lazy?: L };

export function useQuery<T, U = T>(options: UseQueryOptions<T, U>) {
  const { apiConfig, queryClient } = useApiConfig();

  const { fetcherConfig, lazy, enabled = true, queryFn, ...libOptions } = options;

  const [config, setConfig] = useState<Nullable<DeepPartial<UseQueryOptionsBase<T, U>>>>();

  const builder = useCallback(
    (builder: QueryBuilder<T, U>) => {
      const result = builder(options, apiConfig);
      setConfig(result);
    },
    [apiConfig, options]
  );

  const defaultQueryFn = useCallback<QueryFunction>(
    async ({ queryKey, signal }) => {
      const { url, method, ...hlConfig } = apiConfig;
      try {
        const finalUrl = [url, ...queryKey].join("/");
        const { data } = await axios(finalUrl, {
          method: method || "POST",
          signal,
          ...hlConfig,
          ...fetcherConfig,
        });
        return data;
      } catch (error) {
        throw finalizeError(error);
      }
    },
    [apiConfig, fetcherConfig]
  );

  const query = useQueryLib<T, SerializableError, U>(
    {
      ...libOptions,
      enabled: (enabled && !lazy) || !!config,
      queryFn: (queryFn || defaultQueryFn) as Any,
    },
    queryClient
  );

  return lazy ? ([builder, query] as const) : query;
}
