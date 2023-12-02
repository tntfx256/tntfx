import { useEffect } from "react";
import type { PropsAndChildren } from "@tntfx/core";
import { useIsDarkMode } from "../hooks";
import "../styles/base/index.scss";

export enum ColorScheme {
  Dark = "dark",
  Light = "light",
  System = "system",
}

interface ThemeProviderProps extends PropsAndChildren {
  mode?: ColorScheme;
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
