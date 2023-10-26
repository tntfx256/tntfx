import type { CSSProperties } from "react";
import type { Any, Keys, Shape, Size, TObject, Variant } from "@tntfx/core";
import { useSerializedMemo } from "@tntfx/hooks";
import { CssSizeMap } from "../utils/const";
import { splitBySpace } from "../utils/utils";

export type EnhancedProps = {
  style: CSSProperties;
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
  className: string;

  horizontal: boolean;
  draggable: boolean;
  resizable: boolean;

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
  justifyContent(value, style) {
    style.justifyContent = value;
  },
  width(value, style) {
    style.width = value;
  },
  height(value, style) {
    style.height = value;
  },
  flex(value, style) {
    style.flex = value;
  },
  padding(value, _, classList) {
    // style.padding = `var(--layout-spacing)`;
    classList.add(`p-${CssSizeMap[value]}`);
  },
  verticalPadding(value, _, classList) {
    classList.add(`py-${CssSizeMap[value]}`);
    // style.paddingTop = `var(--layout-spacing${CssSizeMap[value]})`;
    // style.paddingBottom = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  horizontalPadding(value, _, classList) {
    classList.add(`px-${CssSizeMap[value]}`);
    // style.paddingLeft = `var(--layout-spacing${CssSizeMap[value]})`;
    // style.paddingRight = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  margin(value, _, classList) {
    classList.add(`m-${CssSizeMap[value]}`);
    // style.margin = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  verticalMargin(value, _, classList) {
    classList.add(`my-${CssSizeMap[value]}`);
    // style.paddingTop = `var(--layout-spacing${CssSizeMap[value]})`;
    // style.paddingBottom = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  horizontalMargin(value, _, classList) {
    classList.add(`mx-${CssSizeMap[value]}`);
    // style.paddingLeft = `var(--layout-spacing${CssSizeMap[value]})`;
    // style.paddingRight = `var(--layout-spacing${CssSizeMap[value]})`;
  },
  borderRadius(value, _, classList) {
    classList.add(`br-${CssSizeMap[value]}`);
    // style.borderRadius = `var(--border-radius${CssSizeMap[value]})`;
  },
  elevation(value, _, classList) {
    classList.add(`shadow-${CssSizeMap[value]}`);
    // style.boxShadow = `var(--shadow${CssSizeMap[value]})`;
  },
  style(value, style) {
    Object.assign(style, value);
  },
  className(value, _, classList) {
    splitBySpace(value).forEach((v) => classList.add(v));
  },
  //
  horizontal(value, _, classList) {
    if (value) {
      classList.add("horizontal");
    } else {
      classList.delete("horizontal");
    }
  },
  draggable(value, _, classList) {
    if (value) {
      classList.add("draggable");
    } else {
      classList.delete("draggable");
    }
  },
  resizable(value, _, classList) {
    if (value) {
      classList.add("resizable");
    } else {
      classList.delete("resizable");
    }
  },
  shape(value, _, classList) {
    classList.add(`shape-${value}`);
  },
  variant(value, _, classList) {
    classList.add(`variant-${value}`);
  },
};

type PK = Keys<EnhancedProps>;
const propKeys = Object.keys(propsMap) as PK[];
export function useParseProps(props: TObject) {
  const result = useSerializedMemo(() => {
    const classList = new Set<string>();
    const styles: CSSProperties = {};
    const cmpProps: Any = {};

    for (const [key, value] of Object.entries(props)) {
      if (propKeys.includes(key as PK)) {
        propsMap[key as PK](value as never, styles, classList);
      } else {
        cmpProps[key] = value;
      }
    }

    return {
      props: cmpProps,
      className: Array.from(classList).join(" "),
      style: styles,
    };
  }, [props]);

  return result;
}
