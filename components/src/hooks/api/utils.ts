import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { isClient, ONE_DAY_MS, ONE_MINUTE_MS } from "@tntfx/core";

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        staleTime: 15 * ONE_MINUTE_MS,
        gcTime: 7 * ONE_DAY_MS,
      },
      mutations: {},
    },
  });
  return queryClient;
}

export function createPersister() {
  return createSyncStoragePersister({
    storage: isClient() ? window.localStorage : undefined,
    // serialize: (data) => compress(serialize(data)),
    // deserialize: (data) => deserialize(decompress(data)),
    // throttleTime: 1000,
    // retry: removeOldestQuery
  });
}

export function stringQuery<T = string>(variable: T): T {
  return variable;
}
