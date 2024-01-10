import { useCallback } from "react";
import type { UseMutationOptions as UseMutationOptionsLib } from "@tanstack/react-query";
import { useMutation as useMutationLib } from "@tanstack/react-query";
import type { SerializableError } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { useApiConfig } from "./api-provider";

export type UseMutationOptions<T, V = T, C = unknown> = Partial<UseMutationOptionsLib<T, SerializableError, V, C>> & {
  fetcherConfig?: AxiosRequestConfig<C>;
};

export function useMutation<T, V = T, C = unknown>(options: UseMutationOptions<T, V, C>) {
  const { apiConfig } = useApiConfig();

  const { fetcherConfig, mutationFn, mutationKey = [], ...mutationOptions } = options;

  const defaultMutationFn = useCallback(
    async (variables: V) => {
      const { url, method, ...hlConfig } = apiConfig;
      const finalUrl = [url, ...mutationKey].join("/");

      try {
        const { data } = await axios(finalUrl, {
          method: method || "POST",
          data: variables,
          ...hlConfig,
          ...fetcherConfig,
        });
        return data;
      } catch (error) {
        return finalizeError(error);
      }
    },
    [apiConfig, fetcherConfig, mutationKey]
  );

  return useMutationLib({
    ...mutationOptions,

    mutationFn: mutationFn || defaultMutationFn,
  });
}
