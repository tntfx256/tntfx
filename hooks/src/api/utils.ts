import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import type { QueryClientConfig } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { compress, decompress, deserialize, isClient, ONE_DAY_MS, ONE_MINUTE_MS, serialize } from "@tntfx/core";
import type { ApiConfig } from "./api-provider";
import type { RequestOptions } from "./request";

export function splitApiConfig(config: ApiConfig): [RequestOptions, QueryClientConfig] {
  const { defaultOptions, mutationCache, queryCache, ...requestOptions } = config;

  return [requestOptions, { defaultOptions, mutationCache, queryCache }];
}

export function createQueryClient(config: ApiConfig) {
  const [, { defaultOptions, queryCache, mutationCache }] = splitApiConfig(config);

  const queryClient = new QueryClient({
    defaultOptions: {
      ...defaultOptions,
      queries: {
        retry: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        staleTime: 15 * ONE_MINUTE_MS,
        gcTime: 7 * ONE_DAY_MS,
        ...defaultOptions?.queries,
      },
      mutations: {
        retry: false,
        ...defaultOptions?.mutations,
      },
    },
    queryCache,
    mutationCache,
  });
  return queryClient;
}

export function createPersister() {
  return createSyncStoragePersister({
    storage: isClient() ? window.localStorage : undefined,
    serialize: (data) => compress(serialize(data)),
    deserialize: (data) => deserialize(decompress(data)),
    // throttleTime: 1000,
    // retry: removeOldestQuery
  });
}

export function stringQuery<T = string>(variable: T): T {
  return variable;
}
