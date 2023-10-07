import type { Any, Enumerable, Sizable, Size } from "@tntfx/core";
import { defaultThemeOptions } from "./styles/defaults";

type CssVarType = "rem" | "ms";
type SpacingMapFn = (sizeName: Size, sizeValue: number, index: number) => Any<string>;
type SpacingReduceFn<T = string | number> = (sizeValue: number, index: number) => T;

export class Spacing {
  static #sizeMap: Sizable = defaultThemeOptions.layout.scales;

  static set sizeMap(newMap: Sizable) {
    Spacing.#sizeMap = newMap;
  }

  static toRem(pxSize: number, basePX = 16): string {
    return `${+(pxSize / basePX).toFixed(4)}rem`;
  }

  static map(cb: SpacingMapFn) {
    return Object.entries(Spacing.#sizeMap)
      .map(([size, value], index) => cb(size as Size, value, index))
      .filter(Boolean);
  }

  static reduce<T = string>(cb: SpacingReduceFn) {
    return Object.entries(Spacing.#sizeMap).reduce<Sizable<T>>(
      (acc, [sizeName, sizeValue], index) => ({ ...acc, [sizeName]: cb(sizeValue, index) }),
      {} as Sizable<T>
    );
  }

  static generateCssVariable(name: string, base: Enumerable<number>, type: CssVarType = "rem"): string {
    if (Array.isArray(base)) {
      return Spacing.map((sizeName, _, index) => {
        const value = base[index] || base[base.length - 1];
        return `--${name}-${sizeName}: ${getValue(value, type)};`;
      }).join(" ");
    }

    return Spacing.map((sizeName, sizeValue) => `--${name}-${sizeName}: ${getValue(sizeValue * base, type)};`).join(" ");
  }
}

function getValue(value: number, type: CssVarType) {
  if (type === "ms") return `${Math.ceil(value)}ms`;

  return Spacing.toRem(value);
}
