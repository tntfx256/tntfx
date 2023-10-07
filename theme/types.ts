import type { Sizable } from "@tntfx/core";

export type ColorScheme = "dark" | "light";
export type ColorSchemeMode = ColorScheme | "system";

type ColorCombo = { main: string; text: string };

export type PaletteColor = ColorCombo & { alpha: ColorCombo };
export type PaletteColorWithAlt = PaletteColor & { alt: PaletteColor };

export type Breakpoint = "xSmall" | "small" | "medium" | "large" | "xLarge";
export type Breakpoints = Record<Breakpoint, number>;

export interface Theme {
  mode: ColorScheme;
  isDark: boolean;
  animation: {
    duration: Sizable<string>;
    easing: string;
  };

  breakpoints: Breakpoints;

  layout: {
    borderRadius: Sizable<string>;
    elementWidth: Sizable<string>;
    elementHeight: Sizable<string>;
    iconSize: Sizable<string>;
    spacing: Sizable<string>;
  };

  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    warning: PaletteColor;
    body: PaletteColorWithAlt;
    element: PaletteColorWithAlt;

    border: PaletteColor;
    selected: PaletteColor;

    backdrop: PaletteColor;
    shadow: Sizable<string>;
  };

  typography: {
    fontFamily: string;
    fontSize: Sizable<string>;
    fontWeight: Sizable<string | number>;
    lineHeight: Sizable<string>;
  };
}

export type ThemeOptions = {
  mode: ColorScheme;

  animation?: {
    duration?: number;
    easing?: string;
  };

  layout?: {
    borderRadiusBase?: number;
    breakpoints?: Breakpoints;
    elementHeightBase?: number;
    elementWidthBase?: number;
    iconSizeBase?: number;
    scales?: Sizable;
    spacingBase?: number;
  };

  palette?: {
    primary: string;
    secondary: string;

    body?: string;
    bodyAlt?: string;
    border?: string;
    element?: string;
    elementAlt?: string;
    error?: string;
    info?: string;
    success?: string;
    text?: { dark: string; light: string };
    warning?: string;

    selected?: string;
  };

  typography?: {
    fontFamily?: string;
    fontSizeBase?: number;
    fontWeights?: Sizable<number | string>;
    lineHeightBase?: number;
  };
};
