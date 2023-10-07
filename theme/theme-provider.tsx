import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isServer, logger } from "@tntfx/core";
import { injectTheme } from "./styles/css-vars";
import { createTheme } from "./theme";
import type { ColorScheme, ColorSchemeMode, Theme } from "./types";
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

const defaultTheme = createTheme({ mode: "light" });
injectTheme(defaultTheme);

const ThemeContext = createContext<ThemeState>({
  theme: defaultTheme,
});
ThemeContext.displayName = "themeProvider";

export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
  const { mode, defaultTheme, alternateTheme, children } = props;

  const getNewTheme = useCallback(() => {
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

    const colorScheme = mode === "system" ? getSystemColorScheme(defaultTheme.mode) : mode;

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
  }, [alternateTheme, defaultTheme, mode]);

  const [state, setState] = useState<ThemeState>(() => ({ theme: getNewTheme() }));

  // setting system themeChange handler
  useEffect(() => {
    const mqListener = () => {
      setState({ theme: getNewTheme() });
    };
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    // setting the color scheme change handler
    if (mode === "system") {
      darkThemeMq.addEventListener("change", mqListener);
    }

    setState({ theme: getNewTheme() });

    return () => darkThemeMq.removeEventListener("change", mqListener);
  }, [getNewTheme, mode]);

  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const { theme } = useContext(ThemeContext);

  return useMemo(() => ({ theme, isDark: theme.mode === "dark" }), [theme]);
}

function getSystemColorScheme(defaultMode: ColorScheme): ColorScheme {
  if (isServer()) {
    return defaultMode;
  }

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  return darkThemeMq.matches ? "dark" : "light";
}
