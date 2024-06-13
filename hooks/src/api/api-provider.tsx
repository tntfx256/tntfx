import type { ReactNode } from "react";
import { useMemo } from "react";
import type { QueryClient, QueryClientConfig } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type { RequestOptions } from "./request";
import { createPersister, createQueryClient } from "./utils";
import { createStore } from "../store";

export type ApiConfig = RequestOptions & QueryClientConfig;

export type ApiContextType = {
  apiConfig: ApiConfig;
  queryClient: QueryClient;
};

const { StoreProvider, useStore } = createStore<ApiContextType>({ name: "api" });

export type ApiProviderProps = {
  apiConfig: ApiConfig;
  children?: ReactNode;
};

export function ApiProvider(props: ApiProviderProps) {
  const { apiConfig, children } = props;

  const client = useMemo(() => createQueryClient(apiConfig), [apiConfig]);
  const persistOptions = useMemo(() => ({ persister: createPersister() }), []);

  return (
    <StoreProvider apiConfig={apiConfig} queryClient={client}>
      <PersistQueryClientProvider client={client} persistOptions={persistOptions}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </PersistQueryClientProvider>
    </StoreProvider>
  );
}

export function useApiConfig() {
  return useStore()[0];
}
