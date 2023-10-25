import { type PropsWithChildren } from "react";
import type { PrepareHeaders } from "./types";
import { initStore } from "../store";

export type ApiConfig = {
  base?: string;
  gql?: string;
  prepareHeaders?: PrepareHeaders;
};

const { StoreProvider, useStore } = initStore<ApiConfig>({ name: "api" });

export type ApiProviderProps = {
  apiConfig: ApiConfig;
};

export function ApiProvider(props: PropsWithChildren<ApiProviderProps>) {
  const { apiConfig, children } = props;

  return <StoreProvider {...apiConfig}>{children}</StoreProvider>;
}

export function useApiConfig() {
  return useStore()[0];
}
