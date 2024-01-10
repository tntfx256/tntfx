import type { FunctionComponent, ReactElement, ReactNode } from "react";
import type { Any, Nullable, SerializableError } from "@tntfx/core";
import { ErrorContent } from "./layout";
import { Loader } from "../base-components";

type Condition = {
  condition: Any<boolean>;
  component: ReactNode;
};

type WithDataComponent<T = Any, P = {}> = FunctionComponent<{ data: T } & P>;

type ConditionalProps<T = Any> = {
  conditions?: Condition[];
  isLoading?: Nullable<boolean>;
  error?: Nullable<SerializableError>;
  data?: Nullable<T>;
  fallback?: ReactElement;
  withData?: WithDataComponent<T>;
};

export function Conditional<T = Any>(props: ConditionalProps<T>) {
  const { isLoading, error, conditions, data, withData, fallback } = props;

  if (isLoading) {
    return <Loader visible />;
  }

  if (error) {
    return <ErrorContent error={error} />;
  }

  if (conditions) {
    for (const { condition, component } of conditions) {
      if (condition) {
        return component as ReactElement;
      }
    }
  }

  if (withData && data) {
    return withData({ data });
  }

  return fallback || null;
}
