import type { DeepRequired, Sizable } from "@tntfx/core";
import { Color, Colors } from "@tntfx/theme";
import type { Theme, ThemeOptions } from "./types";

const cliSize: Sizable = { xxSmall: 0, xSmall: 0, small: 1, medium: 2, large: 4, xLarge: 6, xxLarge: 8, xxxLarge: 8 };

export function createTheme(themeOptions?: ThemeOptions): Theme {
  const { palette } = mergeTheme(themeOptions);

  return {
    layout: {
      borderRadius: cliSize,
      spacing: cliSize,
    },

    palette: {
      selected: Color.combo(palette.selected, palette.text),
      body: Color.comboWithAlt(palette.body, palette.bodyAlt, palette.text),
      border: Color.combo(palette.border, palette.text),
      element: Color.comboWithAlt(palette.element, palette.elementAlt, palette.text),
      error: Color.combo(palette.error, palette.text),
      info: Color.combo(palette.info, palette.text),

      primary: Color.combo(palette.primary, palette.text),
      secondary: Color.combo(palette.secondary, palette.text),
      success: Color.combo(palette.success, palette.text),
      warning: Color.combo(palette.warning, palette.text),
    },
  };
}

function mergeTheme(inputTheme: ThemeOptions = {}): DeepRequired<ThemeOptions> {
  return {
    ...defaultThemeOptions,
    ...inputTheme,

    palette: {
      ...defaultThemeOptions.palette,
      ...inputTheme.palette,
    },
  };
}

const defaultThemeOptions: DeepRequired<ThemeOptions> = {
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

export const theme = createTheme();
