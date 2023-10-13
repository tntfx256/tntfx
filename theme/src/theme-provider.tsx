import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { logger } from "@tntfx/core";
import { useColorScheme } from "./hooks";
import { injectTheme } from "./styles/css-vars";
import { defaultTheme } from "./styles/theme";
import type { ColorSchemeMode, Theme } from "./types";
// reset should be first
import "./styles/reset.scss";
// and then the global
import "./styles/globals.scss";

export type ThemeProviderProps = {
  mode?: ColorSchemeMode;
  defaultTheme: Theme;
  alternateTheme?: Theme;
};

export type ThemeState = {
  theme: Theme;
};

injectTheme(defaultTheme);

const ThemeContext = createContext<ThemeState>({
  theme: defaultTheme,
});
ThemeContext.displayName = "themeProvider";

export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
  const { mode, defaultTheme, alternateTheme, children } = props;

  const isDark = useColorScheme();

  const setTheme = useCallback(() => {
    let hasError = false;
    if (defaultTheme.mode === alternateTheme?.mode) {
      hasError = true;
      logger.warn("default and alternate theme has the same mode! The alternateTheme will be ignored.");
    }

    if (mode === "system" && !alternateTheme) {
      hasError = true;
      logger.warn("you need to provide an alternativeTheme when selecting the system mode. Falling back to defaultTheme.");
    }

    if (!alternateTheme || hasError) {
      const theme = defaultTheme;
      injectTheme(theme);
      return theme;
    }

    const colorScheme = mode === "system" ? (isDark ? "dark" : "light") : mode;

    const theme =
      defaultTheme.mode === "light"
        ? // defaultTheme is light
          colorScheme === "light"
          ? defaultTheme
          : alternateTheme
        : // defaultTheme is dark
        colorScheme === "dark"
        ? defaultTheme
        : alternateTheme;

    injectTheme(theme);
    return theme;
  }, [alternateTheme, defaultTheme, isDark, mode]);

  const [state, setState] = useState<ThemeState>(() => ({ theme: setTheme() }));

  // setting system themeChange handler
  useEffect(() => {
    setState({ theme: setTheme() });
  }, [setTheme, mode]);

  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const { theme } = useContext(ThemeContext);

  return { theme, isDark: theme.mode === "dark" };
}
