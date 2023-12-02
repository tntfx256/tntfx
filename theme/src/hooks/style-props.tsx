import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { Accent, Any, EnumString, Keys, Layout, MessageType, Size, TObject, Variant } from "@tntfx/core";
import { accents, isEqual, messageTypes, sizes } from "@tntfx/core";
import type { Theme } from "../theme";
import { theme } from "../theme";
import { splitBySpace } from "../utils/utils";

type Css = CSSProperties;
type WithSize<T = string | number> = T | EnumString<Size>;
type WithVariant = EnumString<Variant>;
type WithLayout = EnumString<Layout>;
type WithType = EnumString<MessageType>;
type WithAccent = EnumString<Accent>;

function withSize<K extends keyof Theme>(value: Any, property: K) {
  return sizes.includes(value as Size) ? (theme as Any)[property][value] : value;
}

export const propsMap = {
  accent(value: WithAccent, style: Css, classList: Set<string>) {
    if (accents.includes(value as Accent)) {
      style.color = `var(--color-${value})`;
      classList.add(`--${value}`);
    }
  },
  alignItems(value: Css["alignItems"], style: Css) {
    style.display = "flex";
    style.alignItems = value;
  },
  borderRadius(value: WithSize<Css["borderRadius"]>, style: Css) {
    style.borderRadius = withSize(value, "borderRadius");
  },
  className(value: string, _: Css, classList: Set<string>) {
    splitBySpace(value).forEach((v) => {
      classList.add(v);
    });
  },
  color(value: CSSProperties["color"], style: Css) {
    style.color = value;
  },
  disabled(value: boolean, _: Css, classList: Set<string>) {
    if (value) {
      classList.add("--disabled");
    } else {
      classList.delete("--disabled");
    }
  },
  elevation(value: WithSize, _: Css, classList: Set<string>) {
    classList.add(`--elevation-${value}`);
  },
  flex(value: Css["flex"], style: Css) {
    style.flex = value;
  },
  flow(value: Css["flexFlow"], style: Css) {
    style.display = "flex";
    style.flexFlow = value;
  },
  fontWeight(value: WithSize<Css["fontWeight"]>, style: Css) {
    style.fontWeight = withSize(value, "fontWeight");
  },
  fontSize(value: WithSize<Css["fontSize"]>, style: Css) {
    style.fontSize = withSize(value, "fontSize");
  },
  height(value: WithSize<Css["height"]>, style: Css) {
    style.height = withSize(value, "size");
  },
  horizontal(value: boolean, style: Css, classList: Set<string>) {
    if (value) {
      style.display = "flex";
      style.flexFlow = "row nowrap";
      classList.add("--horizontal");
    } else {
      classList.delete("--horizontal");
    }
  },
  horizontalMargin(value: WithSize<Css["marginLeft"]>, style: Css) {
    style.marginLeft = withSize(value, "spacing");
    style.marginRight = withSize(value, "spacing");
  },
  horizontalPadding(value: WithSize<Css["paddingLeft"]>, style: Css) {
    style.paddingLeft = withSize(value, "spacing");
    style.paddingRight = withSize(value, "spacing");
  },
  justifyContent(value: Css["justifyContent"], style: Css) {
    style.display = "flex";
    style.justifyContent = value;
  },
  layout(value: WithLayout, _: Css, classList: Set<string>) {
    classList.add(`--${value}`);
  },
  margin(value: WithSize<Css["margin"]>, style: Css) {
    style.margin = withSize(value, "spacing");
  },
  padding(value: WithSize<Css["padding"]>, style: Css) {
    style.padding = withSize(value, "spacing");
  },
  shadow(value: WithSize, _: Css, classList: Set<string>) {
    classList.add(`--shadow-${value}`);
  },
  size(value: WithSize<Css["width"]>, style: Css) {
    style.width = withSize(value, "size");
    style.height = withSize(value, "size");
  },
  style(value: Css, style: Css) {
    Object.assign(style, value);
  },
  textAlign(value: Css["textAlign"], style: Css) {
    style.textAlign = value;
  },
  type(value: WithType, _: Css, classList: Set<string>) {
    if (messageTypes.includes(value as MessageType)) {
      classList.add(`--${value}`);
    }
  },
  variant(value: WithVariant, _: Css, classList: Set<string>) {
    classList.add(`--${value}`);
  },
  verticalMargin(value: WithSize<Css["marginTop"]>, style: Css) {
    style.marginTop = withSize(value, "spacing");
    style.marginBottom = withSize(value, "spacing");
  },
  verticalPadding(value: WithSize<Css["paddingTop"]>, style: Css) {
    style.paddingTop = withSize(value, "spacing");
    style.paddingBottom = withSize(value, "spacing");
  },
  width(value: WithSize<Css["width"]>, style: Css) {
    style.width = withSize(value, "elementWidth");
  },
};

type PK = Keys<typeof propsMap>;
export type EnhancedProps = {
  [K in PK]?: Parameters<(typeof propsMap)[K]>[0];
};

const enhancedPropNames = Object.keys(propsMap) as PK[];

type ReturnType = { className: string; style: Css };

export function parseProps<T extends TObject = TObject>(props: T): ReturnType {
  const style: Css = {};
  const classes = new Set<string>();

  for (const key of enhancedPropNames) {
    if (key in props) {
      const value = props[key as keyof T];
      propsMap[key as PK](value as never, style, classes);
    }
  }

  return { className: Array.from(classes).join(" "), style };
}

export function useParseProps<T extends TObject = TObject>(props: T): ReturnType {
  const propsRef = useRef(props);
  const [result, setResult] = useState<ReturnType>(() => parseProps(props));

  useEffect(() => {
    if (!isEqual(propsRef.current, props)) {
      propsRef.current = props;
      setResult(parseProps(props));
    }
  }, [props]);

  return result;
}
