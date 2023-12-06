import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { createDOMRenderer, RendererProvider, SSRProvider } from "@fluentui/react-components";
import type { ApiConfig } from "@tntfx/hooks";
import { ApiProvider, Runtime } from "@tntfx/hooks";
import type { ColorScheme, Theme } from "@tntfx/theme";
import { ThemeProvider } from "@tntfx/theme";
import { PopupProvider } from "./popup";
import { DialogProvider } from "./popup/dialog/dialog-context";

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
export interface Router {
  back(): void;
  forward(): void;
  refresh(): void;
  push(href: string, options?: NavigateOptions): void;
  replace(href: string, options?: NavigateOptions): void;
  prefetch(href: string, options?: PrefetchOptions): void;
}

export type FrameworkTheme<S extends ColorScheme = ColorScheme> = { colorScheme: S } & (S extends "dark"
  ? { darkTheme: Theme }
  : S extends "light"
    ? { lightTheme: Theme }
    : { lightTheme: Theme; darkTheme: Theme });

type FrameWorkContext = { router: Router };

const fwContext = createContext<FrameWorkContext>({} as FrameworkProps);

export type FrameworkProps<S extends ColorScheme = ColorScheme> = FrameWorkContext & {
  api?: ApiConfig;
  theme?: FrameworkTheme<S>;
};

const renderer = createDOMRenderer();

export function FrameworkProvider(props: PropsWithChildren<FrameworkProps>) {
  const { children, theme, api, ...context } = props;

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <fwContext.Provider value={context}>
          <ThemeProvider {...theme}>
            <ApiProvider apiConfig={api || {}}>
              <Runtime>
                <PopupProvider>
                  <DialogProvider>{children}</DialogProvider>
                </PopupProvider>
              </Runtime>
            </ApiProvider>
          </ThemeProvider>
        </fwContext.Provider>
      </SSRProvider>
    </RendererProvider>
  );
}

export const useFramework = () => useContext(fwContext);
