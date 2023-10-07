import type { CSSProperties } from "react";
import type { Any, Keys, OBJECT, Shape, Size, Variant } from "@tntfx/core";
import { splitProperties } from "@tntfx/core";
import { useSerializedMemo } from "@tntfx/hooks";
import { CssSizeMap } from "./const";

export type EnhancedProps = {
  // styles
  alignItems: CSSProperties["alignItems"];
  justifyContent: CSSProperties["justifyContent"];
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  flex: CSSProperties["flex"];
  padding: Size;
  verticalPadding: Size;
  horizontalPadding: Size;
  margin: Size;
  verticalMargin: Size;
  horizontalMargin: Size;
  borderRadius: Size;
  elevation: Size;
  style: CSSProperties;
  // classNames
  shape: Shape;
  variant: Variant;
};

type PropMap = {
  [K in Keys<EnhancedProps>]: (value: EnhancedProps[K], style: CSSProperties, classList: Set<string>) => void | string;
};

export const propsMap: PropMap = {
  alignItems(value, style) {
    style.alignItems = value;
  },
  justifyContent: function (value, style) {
    style.justifyContent = value;
  },
  width: function (value, style) {
    style.width = value;
  },
  height: function (value, style) {
    style.height = value;
  },
  flex: function (value, style) {
    style.flex = value;
  },
  padding: function (value, style) {
    style.padding = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  verticalPadding: function (value, style) {
    style.paddingTop = `var(--layout-spacing${CssSizeMap[value]})`;
    style.paddingBottom = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  horizontalPadding: function (value, style) {
    style.paddingLeft = `var(--layout-spacing${CssSizeMap[value]})`;
    style.paddingRight = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  margin: function (value, style) {
    style.margin = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  verticalMargin: function (value, style) {
    style.paddingTop = `var(--layout-spacing${CssSizeMap[value]})`;
    style.paddingBottom = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  horizontalMargin: function (value, style) {
    style.paddingLeft = `var(--layout-spacing${CssSizeMap[value]})`;
    style.paddingRight = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  borderRadius: function (value, style) {
    style.borderRadius = `var(--border-radius${CssSizeMap[value]})`;
  },
  elevation: function (value, style) {
    style.boxShadow = `var(--shadow${CssSizeMap[value]})`;
  },
  style: function (value, style) {
    Object.entries(value).forEach(([k, v]) => {
      (style as Any)[k] = v as Any;
    });
  },
  //
  shape(value, style, classList) {
    classList.add(`shape-${value}`);
  },
  variant(value, style, classList) {
    classList.add(`variant-${value}`);
  },
};

const propKeys = Object.keys(propsMap) as Keys<EnhancedProps>[];
const split = splitProperties(...propKeys);

export function useStyle(props: OBJECT) {
  const [enhancements, remaining] = split(props);

  const result = useSerializedMemo(() => {
    const classList = new Set<string>();
    const enhancedStyles: CSSProperties = {};

    propKeys.forEach((prop) => {
      if (prop in enhancements && enhancements[prop] !== void 0) {
        // @ts-ignore
        propsMap[prop](enhancements[prop], enhancedStyles, classList);
      }
    });

    return {
      props: remaining,
      className: Array.from(classList).join(" "),
      style: enhancedStyles,
    };
  }, [enhancements, remaining]);

  return result;
}

type ClassNames = undefined | string | OBJECT<Any> | [baseClassNames: string | undefined, postfix: string];
export function classNames(...names: ClassNames[]) {
  const list = new Set<string>();

  for (const name of names) {
    if (!name) {
      continue;
    }
    if (typeof name === "string") {
      splitBySpace(name).forEach((n: string) => list.add(n));
    } else if (Array.isArray(name)) {
      splitBySpace(name[0]).forEach((n: string) => list.add(`${n}${name[1]}`));
    } else {
      Object.entries(name).forEach(([k, v]) => (v ? list.add(k) : 0));
    }
  }

  return Array.from(list).join(" ");
}

const space = /\s+/;
function splitBySpace(value: string | undefined): string[] {
  return value ? value.split(space).filter(Boolean) : [];
}
