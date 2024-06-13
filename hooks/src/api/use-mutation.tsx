import { useCallback } from "react";
import type { UseMutationOptions as UseMutationOptionsLib } from "@tanstack/react-query";
import { useMutation as useMutationLib } from "@tanstack/react-query";
import type { SerializableError } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import axios from "axios";
import { useApiConfig } from "./api-provider";
import type { RequestOptions } from "./request";

export type UseMutationOptions<T, V = T, C = unknown> = Partial<UseMutationOptionsLib<T, SerializableError, V, C>> &
  RequestOptions<V>;

export function useMutation<T, V = T, C = unknown>(options: UseMutationOptions<T, V, C>) {
  const { apiConfig, queryClient } = useApiConfig();

  // const [reqConfig] = splitApiConfig(apiConfig);
  const { mutationFn, mutationKey = [], ...mutationOptions } = options;

  const defaultMutationFn = useCallback(
    async (variables: V) => {
      const { url, method, ...hlConfig } = apiConfig;

      try {
        const { data } = await axios({
          url: [url, ...mutationKey].join("/"),
          method: method || "POST",
          data: variables,
          ...hlConfig,
        });
        return data;
      } catch (error) {
        return finalizeError(error);
      }
    },
    [apiConfig, mutationKey]
  );

  return useMutationLib(
    {
      ...mutationOptions,
      mutationFn: mutationFn || defaultMutationFn,
    },
    queryClient
  );
}
