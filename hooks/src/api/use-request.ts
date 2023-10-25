import { useCallback, useMemo, useState } from "react";
import type { Any } from "@tntfx/core";
import { useApiConfig } from "./api-provider";
import { request } from "./axios";
import type { RequestConfig, RequestOptions, RequestState, UseRequest } from "./types";
import { useStateReducer } from "../use-reducer";

export function useRequest<T, U = undefined>(config?: RequestConfig<T>): UseRequest<T, U> {
  // const popup = usePopup();

  const { base, prepareHeaders } = useApiConfig();
  const [controller] = useState(() => new AbortController());
  const [state, setState] = useStateReducer<RequestState<T>>(() => {
    return { data: null, error: null, isLoading: false, response: null };
  });

  const execute = useCallback(
    async (options?: RequestOptions<T, U>): Promise<RequestState<T>> => {
      setState({ isLoading: true });
      const newState = await request<T, U>({ controller, baseUrl: base, prepareHeaders, ...config, ...options });
      setState(newState);
      // if (newState.error)  popup.showMessageBox({ actions: "RetryCancel" }, state.error);
      return newState;
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return useMemo<[typeof execute, typeof state, AbortController]>(
    () => [execute, state, controller],
    [controller, execute, state]
  );
}

export type QueryOptionsBuilder<T, U> = Partial<RequestConfig<T>> & { query: (data: U) => RequestOptions<T, U> };
export function useRequestBuilder<T = Any, U = undefined>(config: QueryOptionsBuilder<T, U>) {
  const { query, ...requestConfig } = config;

  const [execute, status] = useRequest<T, U>(requestConfig);

  const fetcher = useCallback(
    (data: U) => {
      const override = query(data);
      return execute({ method: "GET", ...requestConfig, ...override });
    },

    [execute, query, requestConfig]
  );

  return [fetcher, status] as [typeof fetcher, typeof status];
  // return useMemo<>(() => [fetcher, status], [fetcher, status]);
}
