import { useEffect } from "react";
import type { WithChildren } from "@tntfx/core";
import { isServer } from "@tntfx/core";
import { useIsDarkMode } from "../hooks";
import "../styles/base/index.scss";

export enum ColorScheme {
  Dark = "dark",
  Light = "light",
  System = "system",
}

type ThemeProviderProps = WithChildren<{
  mode?: ColorScheme;
}>;

export function ThemeProvider(props: ThemeProviderProps) {
  return isServer() ? <ServerSideThemeProvider {...props} /> : <ClientSideThemeProvider {...props} />;
}

export function ClientSideThemeProvider(props: ThemeProviderProps) {
  const { mode = "system", children } = props;
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    let colorScheme = mode;
    if (mode === ColorScheme.System) {
      colorScheme = isDarkMode ? ColorScheme.Dark : ColorScheme.Light;
    }
    document.body.classList.add(`--${colorScheme}Mode`);
  }, [isDarkMode, mode]);

  return <>{children}</>;
}

export function ServerSideThemeProvider(props: ThemeProviderProps) {
  return <>{props.children}</>;
}
