import type { DeepRequired } from "@tntfx/core";
import { Spacing } from "./layout";
import { Color } from "./styles/color";
import { Colors } from "./styles/colors";
import { darkThemeOptions, defaultThemeOptions } from "./styles/defaults";
import type { Theme, ThemeOptions } from "./types";

export function createTheme(themeOptions: ThemeOptions): Theme {
  const { mode, animation, palette, layout, typography } = mergeTheme(themeOptions);

  const isDark = mode === "dark";
  const shadow = Color.alpha(palette.border, 0.25);

  return {
    mode,
    isDark,
    animation: {
      duration: Spacing.reduce((value) => `${animation.duration * value}ms`),
      easing: animation.easing,
    },

    breakpoints: {
      ...layout.breakpoints,
    },

    layout: {
      borderRadius: Spacing.reduce((value) => Spacing.toRem(value * layout.borderRadiusBase)),
      elementHeight: Spacing.reduce((value) => Spacing.toRem(value * layout.elementHeightBase)),
      elementWidth: Spacing.reduce((value) => Spacing.toRem(value * layout.elementWidthBase)),
      iconSize: Spacing.reduce((value) => Spacing.toRem(value * layout.iconSizeBase)),
      spacing: Spacing.reduce((value) => Spacing.toRem(value * layout.spacingBase)),
    },

    palette: {
      selected: Color.combo(palette.selected, palette.text),
      backdrop: Color.combo(Color.alpha(Colors.Black, 0.25), palette.text),
      body: Color.comboWithAlt(palette.body, palette.bodyAlt, palette.text),
      border: Color.combo(palette.border, palette.text),
      element: Color.comboWithAlt(palette.element, palette.elementAlt, palette.text),
      error: Color.combo(palette.error, palette.text),
      info: Color.combo(palette.info, palette.text),

      primary: Color.combo(palette.primary, palette.text),
      secondary: Color.combo(palette.secondary, palette.text),
      success: Color.combo(palette.success, palette.text),
      warning: Color.combo(palette.warning, palette.text),

      shadow: Spacing.reduce((value) =>
        [
          `0px 0px ${2 * value}px ${value}px ${shadow}`,
          // `${index + 1}px ${index + 1}px ${4 * value}px ${2 * value}px ${shadow}`,
          // `${index + 2}px ${index + 2}px ${8 * value}px ${4 * value}px ${shadow}`,
        ].join(",")
      ),
    },

    typography: {
      fontFamily: typography.fontFamily,
      fontSize: Spacing.reduce((value) => Spacing.toRem(typography.fontSizeBase * value)),
      fontWeight: typography.fontWeights,
      lineHeight: Spacing.reduce(() => 1.3),
    },
  };
}

function mergeTheme(inputTheme: ThemeOptions): DeepRequired<ThemeOptions> {
  const defaultTheme = inputTheme.mode === "dark" ? darkThemeOptions : defaultThemeOptions;

  return {
    ...defaultTheme,
    ...inputTheme,
    animation: {
      ...defaultTheme.animation,
      ...inputTheme.animation,
    },
    layout: {
      ...defaultTheme.layout,
      ...inputTheme.layout,
    },
    palette: {
      ...defaultTheme.palette,
      ...inputTheme.palette,
    },
    typography: {
      ...defaultTheme.typography,
      ...inputTheme.typography,
    },
  };
}
