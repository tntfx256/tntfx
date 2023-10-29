import type { CSSProperties } from "react";
import type { Any, Keys, Shape, Size, TObject, Variant } from "@tntfx/core";
import { useSerializedMemo } from "@tntfx/hooks";
import { splitBySpace } from "../utils/utils";

export type EnhancedProps = {
  style: CSSProperties;
  alignItems: CSSProperties["alignItems"];
  justifyContent: CSSProperties["justifyContent"];
  width: CSSProperties["width"];
  height: CSSProperties["height"];
  flow: CSSProperties["flexFlow"];
  flex: CSSProperties["flex"];
  whiteSpace: CSSProperties["whiteSpace"];
  padding: Size;
  verticalPadding: Size;
  horizontalPadding: Size;
  margin: Size;
  verticalMargin: Size;
  horizontalMargin: Size;
  borderRadius: Size;
  elevation: Size;
  shadow: Size;
  className: string;

  horizontal: boolean;
  draggable: boolean;
  resizable: boolean;

  shape: Shape;
  variant: Variant;
};

type PropMap = {
  [K in Keys<EnhancedProps>]: (
    value: EnhancedProps[K],
    style: CSSProperties,
    classList: Set<string>
  ) => void | string;
};

export const propsMap: PropMap = {
  alignItems(value, style) {
    style.display = "flex";
    style.alignItems = value;
  },
  justifyContent(value, style) {
    style.display = "flex";
    style.justifyContent = value;
  },
  width(value, style) {
    style.width = value;
  },
  height(value, style) {
    style.height = value;
  },
  flow(value, style) {
    style.flexFlow = value;
  },
  flex(value, style) {
    style.flex = value;
  },
  padding(value, _, classList) {
    classList.add(`p-${value}`);
  },
  verticalPadding(value, _, classList) {
    classList.add(`py-${value}`);
  },
  horizontalPadding(value, _, classList) {
    classList.add(`px-${value}`);
  },
  margin(value, _, classList) {
    classList.add(`m-${value}`);
  },
  verticalMargin(value, _, classList) {
    classList.add(`my-${value}`);
  },
  horizontalMargin(value, _, classList) {
    classList.add(`mx-${value}`);
  },
  borderRadius(value, _, classList) {
    classList.add(`br-${value}`);
  },
  elevation(value, _, classList) {
    classList.add(`elevation-${value}`);
  },
  shadow(value, _, classList) {
    classList.add(`shadow-${value}`);
  },
  whiteSpace(value, style) {
    style.whiteSpace = value;
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
