import {
  Layout,
  MessageType,
  sizes,
  variants,
  type Keys,
  type Shape,
  type Size,
  type TObject,
  type Variant,
  Any,
} from "@tntfx/core";
import { type CSSProperties } from "react";
import { splitBySpace } from "../utils/utils";
import { Theme, theme } from "../components";

type CSS = CSSProperties;
type WithSize<T = string | number> = T | Size | `${Size}`;
type WithVariant<T = string> = T | Variant | `${Variant}`;
type WithShape = Shape | `${Shape}`;
type WithLayout = Layout | `${Layout}`;
type WithType = MessageType | `${MessageType}`;

function withSize<K extends keyof Theme>(value: Any, property: K) {
  return sizes.includes(value as Size) ? (theme as Any)[property][value] : value;
}

export const propsMap = {
  alignItems(value: CSS["alignItems"], style: CSS) {
    style.display = "flex";
    style.alignItems = value;
  },
  borderRadius(value: WithSize<CSS["borderRadius"]>, style: CSS) {
    style.borderRadius = withSize(value, "borderRadius");
  },
  className(value: string, _: CSS, classList: Set<string>) {
    splitBySpace(value).forEach((v) => {
      classList.add(v);
    });
  },
  color(value: WithVariant<CSS["color"]>, style: CSS) {
    if (variants.includes(value as Variant)) {
      style.color = `var(--color-${value})`;
    } else {
      style.color = value;
    }
  },
  disabled(value: boolean, _: CSS, classList: Set<string>) {
    if (value) {
      classList.add("--disabled");
    } else {
      classList.delete("--disabled");
    }
  },
  draggable(value: boolean, _: CSS, classList: Set<string>) {
    if (value) {
      classList.add("--draggable");
    } else {
      classList.delete("--draggable");
    }
  },
  elevation(value: WithSize, _: CSS, classList: Set<string>) {
    classList.add(`--elevation-${value}`);
  },
  flex(value: CSS["flex"], style: CSS) {
    style.flex = value;
  },
  flow(value: CSS["flexFlow"], style: CSS) {
    style.display = "flex";
    style.flexFlow = value;
  },
  fontWeight(value: WithSize<CSS["fontWeight"]>, style: CSS) {
    style.fontWeight = withSize(value, "fontWeight");
  },
  fontSize(value: WithSize<CSS["fontSize"]>, style: CSS) {
    style.fontSize = withSize(value, "fontSize");
  },
  height(value: WithSize<CSS["height"]>, style: CSS) {
    style.height = withSize(value, "size");
  },
  horizontal(value: boolean, style: CSS) {
    if (value) {
      style.display = "flex";
      style.flexFlow = "row nowrap";
    }
  },
  horizontalMargin(value: WithSize<CSS["marginLeft"]>, style: CSS) {
    style.marginLeft = withSize(value, "spacing");
    style.marginRight = withSize(value, "spacing");
  },
  horizontalPadding(value: WithSize<CSS["paddingLeft"]>, style: CSS) {
    style.paddingLeft = withSize(value, "spacing");
    style.paddingRight = withSize(value, "spacing");
  },
  justifyContent(value: CSS["justifyContent"], style: CSS) {
    style.display = "flex";
    style.justifyContent = value;
  },
  layout(value: WithLayout, _: CSS, classList: Set<string>) {
    classList.add(`--${value}`);
  },
  margin(value: WithSize<CSS["margin"]>, style: CSS) {
    style.margin = withSize(value, "spacing");
  },
  padding(value: WithSize<CSS["padding"]>, style: CSS) {
    style.padding = withSize(value, "spacing");
  },
  resizable(value: boolean, _: CSS, classList: Set<string>) {
    if (value) {
      classList.add("--resizable");
    } else {
      classList.delete("--resizable");
    }
  },
  shadow(value: WithSize, _: CSS, classList: Set<string>) {
    classList.add(`--shadow-${value}`);
  },
  shape(value: WithShape, _: CSS, classList: Set<string>) {
    classList.add(`--${value}`);
  },
  size(value: WithSize<never>, style: CSS) {
    style.width = withSize(value, "size");
    style.height = withSize(value, "size");
  },
  style(value: CSS, style: CSS) {
    Object.assign(style, value);
  },
  textAlign(value: CSS["textAlign"], style: CSS) {
    style.textAlign = value;
  },
  type(value: WithType, _: CSS, classList: Set<string>) {
    classList.add(`--${value}`);
  },
  variant(value: WithVariant<never>, _: CSS, classList: Set<string>) {
    classList.add(`--${value}`);
  },
  verticalMargin(value: WithSize<CSS["marginTop"]>, style: CSS) {
    style.marginTop = withSize(value, "spacing");
    style.marginBottom = withSize(value, "spacing");
  },
  verticalPadding(value: WithSize<CSS["paddingTop"]>, style: CSS) {
    style.paddingTop = withSize(value, "spacing");
    style.paddingBottom = withSize(value, "spacing");
  },
  whiteSpace(value: CSS["whiteSpace"], style: CSS) {
    style.whiteSpace = value;
  },
  width(value: WithSize<CSS["width"]>, style: CSS) {
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
  const styles: CSS = {};
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
