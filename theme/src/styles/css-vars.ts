import type { Sizable, Size } from "@tntfx/core";
import { isServer } from "@tntfx/core";
import { CssSizeMap } from "./const";
import type { PaletteColor, Theme } from "../types";

const classes = {
  light: "mode-light",
  dark: "mode-dark",
};

export function injectTheme(theme: Theme) {
  const { breakpoints, animation, palette, layout, typography } = theme;
  const isDark = theme.mode === "dark";

  if (isServer()) {
    return;
  }

  document.body.classList.add(isDark ? classes.dark : classes.light);
  document.body.classList.remove(isDark ? classes.light : classes.dark);

  const style = document.documentElement.style;

  // BREAKPOINT
  style.setProperty("--breakpoint-xs", `${breakpoints.xSmall}px`);
  style.setProperty("--breakpoint-sm", `${breakpoints.small}px`);
  style.setProperty("--breakpoint-md", `${breakpoints.medium}px`);
  style.setProperty("--breakpoint-lg", `${breakpoints.large}px`);
  style.setProperty("--breakpoint-xl", `${breakpoints.xLarge}px`);

  // EFFECTS

  style.setProperty("--effect-hover", isDark ? "75%" : "92.5%");
  style.setProperty("--effect-pressed", isDark ? "70%" : "90%");
  style.setProperty("--effect-disabled", isDark ? "65%" : "85%");

  // FONT
  style.setProperty("--font-family", typography.fontFamily);
  generateSizeVariable("font-size", typography.fontSize);
  generateSizeVariable("font-weight", typography.fontWeight);
  generateSizeVariable("line-height", typography.lineHeight);

  // LAYERING
  style.setProperty("--layer-base", "1");
  style.setProperty("--layer-window", "2");
  style.setProperty("--layer-window-active", "3");
  style.setProperty("--layer-element", "3");
  style.setProperty("--layer-sidebar", "4");
  style.setProperty("--layer-modal", "5");
  style.setProperty("--layer-popup", "5");
  style.setProperty("--layer-dropdown", "9");
  style.setProperty("--layer-toast", "9");
  style.setProperty("--layer-context-menu", "10");

  // LAYOUT
  generateSizeVariable("icon-size", layout.iconSize);
  generateSizeVariable("layout-spacing", layout.spacing);
  generateSizeVariable("border-radius", layout.borderRadius);
  // generateSizeVariable("layout-width-element", layout.elementWidth);
  generateSizeVariable("layout-height-element", layout.elementHeight);

  // ANIMATION/TRANSITION
  style.setProperty("--animation-easing", "cubic-bezier(1, 0, 0, 1)");
  generateSizeVariable("animation-duration", animation.duration);

  // PALETTE
  generateColorVariable("body", palette.body);
  generateColorVariable("body-alt", palette.body.alt);
  generateColorVariable("element", palette.element);
  generateColorVariable("element-alt", palette.element.alt);
  generateColorVariable("primary", palette.primary);
  generateColorVariable("secondary", palette.secondary);
  generateColorVariable("info", palette.info);
  generateColorVariable("success", palette.success);
  generateColorVariable("warning", palette.warning);
  generateColorVariable("error", palette.error);
  generateColorVariable("selected", palette.selected);
  generateColorVariable("backdrop", palette.backdrop);
  generateColorVariable("border", palette.border);

  // generateSizeVariable("shadow", palette.shadow);
  style.setProperty("--color-link", palette.element.text);

  // --
  style.setProperty("--layout-height-element", "var(--layout-height-element-md)");
  style.setProperty("--layout-height-toolbar", "var(--layout-height-element-lg)");

  function generateSizeVariable<T = string>(key: string, collection: Partial<Sizable<T>>) {
    for (const [size, value] of Object.entries(collection)) {
      const sizeKey = CssSizeMap[size as Size] ?? `-${size}`;
      style.setProperty(`--${key}${sizeKey}`, `${value}`);
    }
  }

  function generateColorVariable(type: string, color: PaletteColor) {
    style.setProperty(`--color-${type}`, color.main);
    style.setProperty(`--color-${type}-text`, color.text);

    style.setProperty(`--color-${type}-alpha`, color.alpha.main);
    style.setProperty(`--color-${type}-alpha-text`, color.alpha.text);
  }
}
