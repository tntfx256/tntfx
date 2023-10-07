import type { DeepRequired } from "@tntfx/core";
import { Colors } from "./colors";
import type { ThemeOptions } from "../types";

export const defaultThemeOptions: DeepRequired<ThemeOptions> = {
  mode: "light",
  animation: {
    duration: 150,
    easing: "ease-in-out",
  },

  layout: {
    borderRadiusBase: 8,
    elementHeightBase: 38,
    elementWidthBase: 64,
    iconSizeBase: 24,
    spacingBase: 12,
    breakpoints: {
      xSmall: 320,
      small: 480,
      medium: 768,
      large: 992,
      xLarge: 1200,
    },
    scales: {
      xxSmall: 0.625,
      xSmall: 0.75,
      small: 0.875,
      medium: 1,
      large: 1.125,
      xLarge: 1.5,
      xxLarge: 2,
      xxxLarge: 2.625,
    },
  },

  palette: {
    body: "#f3f3f3",
    bodyAlt: "#f6f6f6",

    element: "#f9f9f9",
    elementAlt: "#fcfcfc",

    border: "#c7c7c7",

    primary: "#2b65ba",
    secondary: "#fefefe",

    info: Colors.Blue,
    success: "#387925",
    warning: Colors.Amber,
    error: "#c42c1d",

    selected: "#eaeaea",

    text: { dark: "#2a2a2b", light: "#ffffff" },
  },

  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, sans-serif`,
    fontSizeBase: 16,
    lineHeightBase: 1.1,
    fontWeights: {
      xxSmall: "lighter",
      xSmall: "lighter",
      small: "normal",
      medium: "normal",
      large: "normal",
      xLarge: "bold",
      xxLarge: "bold",
      xxxLarge: "bolder",
    },
  },
};

export const darkThemeOptions: DeepRequired<ThemeOptions> = {
  ...defaultThemeOptions,
  mode: "dark",

  palette: {
    body: "#232323",
    bodyAlt: "#262626",

    element: "#292929",
    elementAlt: "#2c2c2c",

    border: "#424242",

    primary: "#6ebffa",
    secondary: "#373737",

    info: Colors.Blue,
    success: "#387925",
    warning: Colors.Amber,
    error: "#c52a1b",

    selected: "#2d2d2d",

    text: { dark: "#000000", light: "#ffffff" },
  },
};
