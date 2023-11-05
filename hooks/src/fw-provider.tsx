import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

interface NavigateOptions {
  scroll?: boolean;
}
declare enum PrefetchKind {
  AUTO = "auto",
  FULL = "full",
  TEMPORARY = "temporary",
}
interface PrefetchOptions {
  kind: PrefetchKind;
}
interface Router {
  back(): void;
  forward(): void;
  refresh(): void;
  push(href: string, options?: NavigateOptions): void;
  replace(href: string, options?: NavigateOptions): void;
  prefetch(href: string, options?: PrefetchOptions): void;
}

export type FrameworkProps = {
  router: Router;
};

const fwContext = createContext<FrameworkProps>({} as FrameworkProps);

export function FrameworkProvider(props: PropsWithChildren<FrameworkProps>) {
  const { children, ...context } = props;
  return <fwContext.Provider value={context}>{children}</fwContext.Provider>;
}

export const useFramework = () => useContext(fwContext);
