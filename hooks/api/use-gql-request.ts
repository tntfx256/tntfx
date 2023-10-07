import { useCallback, useMemo, useState } from "react";
import type { Any } from "@tntfx/core";
import { print } from "graphql";
import { useApiConfig } from "./api-provider";
import { request } from "./axios";
import type { GqlRequestConfig, GqlRequestOptions, GqlResult, RequestState, UseGqlRequest, V } from "./types";
import { useStateReducer } from "../use-reducer";

export function useGqlRequest<T, U extends V = V, K extends keyof T | undefined = undefined>(
  config: GqlRequestConfig<T, U, K>
): UseGqlRequest<T, U, K> {
  const { document, key, ...requestConfig } = config || ({} as Any);
  const { base, gql, prepareHeaders } = useApiConfig();
  const [controller] = useState(() => new AbortController());

  const [state, setState] = useStateReducer<RequestState<GqlResult<T, K>>>(() => {
    return { data: null, error: null, isLoading: false, response: null };
  });

  const execute = useCallback(
    async (options?: GqlRequestOptions<T, U>): Promise<RequestState<GqlResult<T, K>>> => {
      setState({ isLoading: true });
      const newState = await request<GqlResult<T, K>, { query: string; variables?: U }>({
        controller,
        baseUrl: gql || base,
        method: "POST",
        body: {
          query: print(document),
          variables: options?.body,
        },
        prepareHeaders: options?.prepareHeaders || prepareHeaders,
        onProgress: options?.onProgress,
        transform({ data }) {
          if (key) {
            data = data[key];
          }
          if (options?.transform) {
            data = options.transform(data);
          } else if (requestConfig.transform) {
            data = requestConfig.transform(data);
          }
          return data;
        },
      });
      setState(newState);
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
