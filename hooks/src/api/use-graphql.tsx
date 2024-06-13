import { useCallback } from "react";
import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
import type { UseMutationOptions as UseMutationOptionsLib } from "@tanstack/react-query";
import { useMutation as useMutationLib } from "@tanstack/react-query";
import type { SerializableError } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { useApiConfig } from "./api-provider";

export type UseGraphqlOptions<T, V = T, C = unknown> = Partial<UseMutationOptionsLib<T, SerializableError, V, C>> & {
  fetcherConfig?: AxiosRequestConfig<C>;
  document: string | DocumentTypeDecoration<T, V>;
  operationName?: string;
};

export function useGraphql<T, V = T, C = unknown>(options: UseGraphqlOptions<T, V, C>) {
  const { apiConfig } = useApiConfig();

  const { fetcherConfig, document, operationName, mutationFn, ...mutationOptions } = options;

  const defaultMutationFn = useCallback(
    async (variables: V) => {
      try {
        const { data } = await axios({
          data: { query: document, variables, operationName },
          ...apiConfig,
          method: apiConfig.method || "POST",
          ...fetcherConfig,
        });
        return data;
      } catch (error) {
        return finalizeError(error);
      }
    },
    [apiConfig, document, fetcherConfig, operationName]
  );

  return useMutationLib({
    ...mutationOptions,

    mutationFn: mutationFn || defaultMutationFn,
  });
}
