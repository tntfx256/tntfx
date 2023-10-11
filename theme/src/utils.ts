import { createThemePalette } from "./styles/color";
import { darkPalette, lightPalette } from "./styles/colors";
import { darkTheme, lightTheme } from "./styles/theme";
import type { Theme, ThemeOptions } from "./types";

export function createTheme(themeOptions: ThemeOptions): Theme {
  const { mode, fontFamily, breakpoints, palette } = themeOptions;

  const isDark = mode === "dark";
  const defaultTheme = isDark ? darkTheme : lightTheme;
  const defaultPalette = isDark ? darkPalette : lightPalette;

  return {
    ...defaultTheme,
    breakpoints: { ...defaultTheme.breakpoints, ...breakpoints },
    palette: createThemePalette({ ...defaultPalette, ...palette }),
    typography: { ...defaultTheme.typography, fontFamily: fontFamily || defaultTheme.typography.fontFamily },
  };
}
