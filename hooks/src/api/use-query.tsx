import { useCallback } from "react";
import type { QueryFunction, UseQueryOptions as UseQueryOptionsLib } from "@tanstack/react-query";
import { useQuery as useQueryLib } from "@tanstack/react-query";
import type { Any, SerializableError } from "@tntfx/core";
import { useApiConfig } from "./api-provider";
import { request, type RequestOptions } from "./request";
import { splitApiConfig } from "./utils";

type UseQueryOptions<T, U, V> = UseQueryOptionsLib<T, SerializableError, U> & RequestOptions<V>;

export function useQuery<T, U = T, V = string>(options: UseQueryOptions<T, U, V>) {
  const { apiConfig, queryClient } = useApiConfig();

  const [reqConfig] = splitApiConfig(apiConfig);
  const { queryFn, ...libOptions } = options;

  const defaultQueryFn = useCallback<QueryFunction>(
    async ({ queryKey, signal }) => {
      const { url, ...fetcherConfig } = reqConfig;

      return request({
        signal,
        url: [url, ...queryKey].join("/"),
        ...fetcherConfig,
      });
    },
    [reqConfig]
  );

  return useQueryLib<T, SerializableError, U>(
    {
      ...libOptions,
      queryFn: (queryFn || defaultQueryFn) as Any,
    },
    queryClient
  );
}
