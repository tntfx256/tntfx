import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import type { Nullable } from "@tntfx/core";
import { type ApiConfig, ApiProvider, Runtime } from "@tntfx/hooks";
import { type ColorScheme, type Theme, ThemeProvider } from "@tntfx/theme";

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

const fwContext = createContext<Nullable<FrameWorkContext>>(null);

export type FrameworkProps<S extends ColorScheme = ColorScheme> = FrameWorkContext & {
  api: ApiConfig;
  theme?: FrameworkTheme<S>;
};

export function FrameworkProvider(props: PropsWithChildren<FrameworkProps>) {
  const { children, theme, api, ...context } = props;

  /*

  const [renderer] = useState(() => createDOMRenderer());
  const didRenderRef = useRef(false);

  useServerInsertedHTML(() => {
    if (didRenderRef.current) {
      return;
      }
      didRenderRef.current = true;
      return <>{renderToStyleElements(renderer)}</>;
      });


  // using these providers will cause the app to lag and flash
  <RendererProvider renderer={renderer}>
    <SSRProvider>
  */

  return (
    <ApiProvider apiConfig={api}>
      <fwContext.Provider value={context}>
        <ThemeProvider {...theme}>
          <Runtime>{children}</Runtime>
        </ThemeProvider>
      </fwContext.Provider>
    </ApiProvider>
  );
}

export function useFramework() {
  const context = useContext(fwContext);

  if (!context) {
    throw new Error("FrameworkProvider is missing");
  }
  return context;
}
