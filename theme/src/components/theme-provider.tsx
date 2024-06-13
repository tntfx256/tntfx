"use client";

import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import type { Theme } from "@fluentui/react-components";
import {
  createDOMRenderer,
  FluentProvider,
  RendererProvider,
  renderToStyleElements,
  SSRProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { useIsDarkMode } from "@tntfx/theme";
import { useGlobalStyle } from "./style-global";
import { useResetStyle } from "./style-reset";

export const colorSchemes = ["light", "dark", "system"] as const;
export type ColorScheme = (typeof colorSchemes)[number];

type ApplicableScheme = Exclude<ColorScheme, "system">;

type ThemeProviderProps = PropsWithChildren & {
  scheme?: ColorScheme;
  lightTheme?: Theme;
  darkTheme?: Theme;
};

export function ThemeProvider(props: ThemeProviderProps) {
  const { scheme = "system", children, darkTheme = webDarkTheme, lightTheme = webLightTheme } = props;

  const isDark = useIsDarkMode();
  const [mode, setMode] = useState<ApplicableScheme>(() => getApplicableScheme(scheme, isDark));

  const [renderer] = useState(() => createDOMRenderer());
  const didRenderRef = useRef(false);

  useServerInsertedHTML(() => {
    if (didRenderRef.current) {
      return;
    }
    didRenderRef.current = true;
    return <>{renderToStyleElements(renderer)}</>;
  });

  useResetStyle();
  useGlobalStyle();

  useEffect(() => {
    setMode(getApplicableScheme(scheme, isDark));
  }, [isDark, scheme]);

  const theme = mode === "dark" ? darkTheme || lightTheme : lightTheme || darkTheme;

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider className="appRoot" theme={theme}>
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}

function getApplicableScheme(scheme: ColorScheme, isDark: boolean): ApplicableScheme {
  return scheme === "system" ? (isDark ? "dark" : "light") : scheme;
}
