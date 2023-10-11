import { createThemePalette } from "./color";
import { darkPalette, lightPalette } from "./colors";
import { toRem } from "./utils";
import type { ColorScheme } from "../types";

export const lightTheme = {
  mode: "light" as ColorScheme,
  isDark: false,

  breakpoints: {
    xSmall: 320,
    small: 480,
    medium: 768,
    large: 992,
    xLarge: 1200,
  },

  animation: {
    duration: {
      short: "150ms",
      medium: "300ms",
      long: "450ms",
    },
    easing: "ease-in-out",
  },

  layout: {
    borderRadius: {
      xxSmall: toRem(2),
      xSmall: toRem(4),
      small: toRem(8),
      medium: toRem(12),
      large: toRem(16),
      xLarge: toRem(20),
      xxLarge: toRem(24),
      xxxLarge: toRem(32),
    },
    elementHeight: {
      small: toRem(24),
      medium: toRem(36),
      large: toRem(48),
    },
    // elementWidth: reduce((value) => toRem(value * layout.elementWidthBase)),
    iconSize: {
      xxSmall: toRem(4),
      xSmall: toRem(8),
      small: toRem(12),
      medium: toRem(16),
      large: toRem(20),
      xLarge: toRem(24),
      xxLarge: toRem(32),
      xxxLarge: toRem(40),
    },
    spacing: {
      xxSmall: toRem(4),
      xSmall: toRem(8),
      small: toRem(12),
      medium: toRem(16),
      large: toRem(20),
      xLarge: toRem(24),
      xxLarge: toRem(32),
      xxxLarge: toRem(40),
    },
  },

  palette: createThemePalette(lightPalette),

  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, sans-serif`,
    fontSize: {
      xxSmall: toRem(10),
      xSmall: toRem(12),
      small: toRem(14),
      medium: toRem(16),
      large: toRem(20),
      xLarge: toRem(24),
      xxLarge: toRem(36),
      xxxLarge: toRem(48),
    },
    lineHeight: {
      xxSmall: toRem(14),
      xSmall: toRem(16),
      small: toRem(20),
      medium: toRem(24),
      large: toRem(28),
      xLarge: toRem(32),
      xxLarge: toRem(48),
      xxxLarge: toRem(56),
    },
    fontWeight: {
      thin: "100",
      extraLight: "200",
      light: "300",
      regular: "300",
      medium: "400",
      bold: "500",
      extraBold: "700",
      black: "900",
    },
  },
};

export const darkTheme = {
  ...lightTheme,
  mode: "dark" as ColorScheme,
  isDark: false,
  palette: createThemePalette(darkPalette),
};

export const defaultTheme = lightTheme;
