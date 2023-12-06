import { type PropsWithChildren, useEffect, useState } from "react";
import type { Theme } from "@fluentui/react-components";
import { FluentProvider } from "@fluentui/react-components";
import { useGlobalStyle } from "./style-global";
import { useResetStyle } from "./style-reset";
import { useIsDarkMode } from "../hooks";

export const colorSchemes = ["light", "dark", "system"] as const;
export type ColorScheme = (typeof colorSchemes)[number];

type ApplicableScheme = Exclude<ColorScheme, "system">;

type ThemeProviderProps = PropsWithChildren & {
  scheme?: ColorScheme;
  lightTheme?: Theme;
  darkTheme?: Theme;
};

export function ThemeProvider(props: ThemeProviderProps) {
  const { scheme = "system", children, darkTheme, lightTheme } = props;

  const isDark = useIsDarkMode();
  const [mode, setMode] = useState<ApplicableScheme>(() => getApplicableScheme(scheme, isDark));

  useResetStyle();
  useGlobalStyle();

  useEffect(() => {
    setMode(getApplicableScheme(scheme, isDark));
  }, [isDark, scheme]);

  return (
    <FluentProvider className="appRoot" theme={mode === "dark" ? darkTheme || lightTheme : lightTheme || darkTheme}>
      {children}
    </FluentProvider>
  );
}

function getApplicableScheme(scheme: ColorScheme, isDark: boolean): ApplicableScheme {
  return scheme === "system" ? (isDark ? "dark" : "light") : scheme;
}
