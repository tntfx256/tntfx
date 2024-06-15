import type { Theme } from "@fluentui/react-components";
import { FluentProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { useIsDarkMode } from "@tntfx/theme";
import { type ReactNode, useEffect, useState } from "react";
import { useGlobalStyle } from "./style-global";

export const colorSchemes = ["light", "dark", "system"] as const;
export type ColorScheme = (typeof colorSchemes)[number];

type ApplicableScheme = Exclude<ColorScheme, "system">;

type ThemeProviderProps = {
  children: ReactNode;
  colorScheme?: ColorScheme;
  lightTheme?: Theme;
  darkTheme?: Theme;
};

export function ThemeProvider(props: ThemeProviderProps) {
  const { colorScheme: scheme = "system", children, darkTheme = webDarkTheme, lightTheme = webLightTheme } = props;

  const isDark = useIsDarkMode();
  const [mode, setMode] = useState<ApplicableScheme>(() => getApplicableScheme(scheme, isDark));

  useGlobalStyle();

  useEffect(() => {
    setMode(getApplicableScheme(scheme, isDark));
  }, [isDark, scheme]);

  const theme = mode === "dark" ? darkTheme || lightTheme : lightTheme || darkTheme;

  return (
    <FluentProvider className="appRoot" theme={theme}>
      {children}
    </FluentProvider>
  );
}

function getApplicableScheme(scheme: ColorScheme, isDark: boolean): ApplicableScheme {
  return scheme === "system" ? (isDark ? "dark" : "light") : scheme;
}
