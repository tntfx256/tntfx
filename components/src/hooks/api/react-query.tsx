import { type PropsWithChildren, useCallback, useState } from "react";
import type { UseQueryOptions as UseQueryOptionsLib } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider, useQuery as useQueryLib } from "@tanstack/react-query";
import type { SerializableError } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import type { AxiosProgressEvent } from "axios";
import axios from "axios";
import type { PrepareHeaders } from "./types";
import { initStore } from "../store";

export function stringQuery(variable: string) {
  return variable;
}

export type ApiConfig = {
  base?: string;
  gql?: string;
  prepareHeaders?: PrepareHeaders;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
};

export type ApiContextType = {
  apiConfig: ApiConfig;
  queryClient: QueryClient;
};

const { StoreProvider, useStore } = initStore<ApiContextType>({ name: "api" });

export type ApiProviderProps = {
  apiConfig: ApiConfig;
};

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 15,
      },
      mutations: {},
    },
  });
  return queryClient;
}

export function ApiProvider(props: PropsWithChildren<ApiProviderProps>) {
  const { apiConfig, children } = props;

  const [queryClient] = useState(() => createQueryClient());

  return (
    <StoreProvider apiConfig={apiConfig} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StoreProvider>
  );
}

// export function useApiConfig() {
//   return useStore()[0];
// }

type UseQueryOptions<T, U = T> = Omit<UseQueryOptionsLib<T, SerializableError, U>, "queryFn"> & {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  prepareHeaders?: PrepareHeaders;
};

export function useQuery<T, U = T>(options: UseQueryOptions<T, U>) {
  const { apiConfig, queryClient } = useStore()[0];

  const { base, prepareHeaders: hlPrepareHeaders } = apiConfig;
  const { onUploadProgress, onDownloadProgress, prepareHeaders, ...libOptions } = options;

  return useQueryLib(
    {
      ...libOptions,
      async queryFn({ queryKey, signal }) {
        const url = new URL(queryKey.join("/"), base);
        try {
          const { data } = await axios.get(url.toString(), {
            signal,
            onUploadProgress,
            onDownloadProgress,
            async transformRequest(data, headers) {
              try {
                if (hlPrepareHeaders) await hlPrepareHeaders(headers);
              } catch {}
              try {
                if (prepareHeaders) await prepareHeaders(headers);
              } catch {}
              return data;
            },
          });
          return data;
        } catch (e) {
          throw finalizeError(e);
        }
      },
    },
    queryClient
  );
}

export type UseLazyQueryOptions<T, U = T, V = string> = UseQueryOptions<T, U> & {
  query(variables: V): string;
};
export function useLazyQuery<T, U = T, V = string>(options: UseLazyQueryOptions<T, U, V>) {
  const { query, ...libOptions } = options;

  const [url, setUrl] = useState<string>("");

  const exec = useCallback(
    (variables: V) => {
      const url = query(variables);
      setUrl(url);
    },
    [query]
  );

  return [exec, useQuery({ ...libOptions, enabled: !!url, queryKey: [...options.queryKey, url] })] as const;
}
