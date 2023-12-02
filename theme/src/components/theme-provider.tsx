import type { PropsAndChildren } from "@tntfx/core";
import "../styles/base/index.scss";

export enum ColorScheme {
  Dark = "dark",
  Light = "light",
  System = "system",
}

interface ThemeProviderProps extends PropsAndChildren {
  mode?: ColorScheme;
}

export function ThemeProvider(props: ThemeProviderProps) {
  return <>{props.children}</>;
}
