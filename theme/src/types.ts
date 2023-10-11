import type { Sizable } from "@tntfx/core";
import { darkTheme, lightTheme } from "./styles/theme";

export type ColorScheme = "dark" | "light";
export type ColorSchemeMode = ColorScheme | "system";

type ColorCombo = { main: string; text: string };

export type PaletteColor = ColorCombo & { alpha: ColorCombo };
export type PaletteColorWithAlt = PaletteColor & { alt: PaletteColor };

export type Breakpoint = "xSmall" | "small" | "medium" | "large" | "xLarge";
export type Breakpoints = Sizable<number, Breakpoint>;

export type ThemeOptions = {
  mode: ColorScheme;

  fontFamily?: string;
  breakpoints?: Breakpoints;

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
};

export type Theme = typeof lightTheme | typeof darkTheme;
