import { type CSSProperties } from "react";
import type { Any, Keys, Layout, MessageType, Shape, Size, TObject, Variant } from "@tntfx/core";
import { sizes, variants } from "@tntfx/core";
import type { Theme } from "../components";
import { theme } from "../components";
import { splitBySpace } from "../utils/utils";

type Css = CSSProperties;
type WithSize<T = string | number> = T | Size | `${Size}`;
type WithVariant<T = string> = T | Variant | `${Variant}`;
type WithShape = Shape | `${Shape}`;
type WithLayout = Layout | `${Layout}`;
type WithType = MessageType | `${MessageType}`;

function withSize<K extends keyof Theme>(value: Any, property: K) {
  return sizes.includes(value as Size) ? (theme as Any)[property][value] : value;
}

export const propsMap = {
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
  color(value: WithVariant<Css["color"]>, style: Css) {
    if (variants.includes(value as Variant)) {
      style.color = `var(--color-${value})`;
    } else {
      style.color = value;
    }
  },
  disabled(value: boolean, _: Css, classList: Set<string>) {
    if (value) {
      classList.add("--disabled");
    } else {
      classList.delete("--disabled");
    }
  },
  draggable(value: boolean, _: Css, classList: Set<string>) {
    if (value) {
      classList.add("--draggable");
    } else {
      classList.delete("--draggable");
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
  horizontal(value: boolean, style: Css) {
    if (value) {
      style.display = "flex";
      style.flexFlow = "row nowrap";
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
  resizable(value: boolean, _: Css, classList: Set<string>) {
    if (value) {
      classList.add("--resizable");
    } else {
      classList.delete("--resizable");
    }
  },
  shadow(value: WithSize, _: Css, classList: Set<string>) {
    classList.add(`--shadow-${value}`);
  },
  shape(value: WithShape, _: Css, classList: Set<string>) {
    classList.add(`--${value}`);
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
    classList.add(`--${value}`);
  },
  variant(value: WithVariant<never>, _: Css, classList: Set<string>) {
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
  whiteSpace(value: Css["whiteSpace"], style: Css) {
    style.whiteSpace = value;
  },
  width(value: WithSize<Css["width"]>, style: Css) {
    style.width = withSize(value, "elementWidth");
  },
};

type PK = Keys<typeof propsMap>;
export type EnhancedProps = {
  [K in PK]: Parameters<(typeof propsMap)[K]>[0];
};

const enhancedPropNames = Object.keys(propsMap) as PK[];
type ReturnType = [className: string, restProps: any];

/**
 *
 * @description it should remove the properties that are not valid for the underlying html element
 */
export function parseProps<T extends TObject = TObject>(props: T): ReturnType {
  const styles: Css = {};
  const classes = new Set<string>();
  const validProps = {} as any;

  for (const key of Object.keys(props)) {
    const value = props[key as keyof T];

    if (enhancedPropNames.includes(key as PK)) {
      propsMap[key as PK](value as never, styles, classes);
    } else {
      validProps[key as PK] = value;
    }
  }

  validProps.style = styles;
  return [Array.from(classes).join(" "), validProps];
}
