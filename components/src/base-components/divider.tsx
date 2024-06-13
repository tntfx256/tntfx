import type { CSSProperties } from "react";
import { Divider as LibDivider, type DividerProps as LibDividerProps } from "@fluentui/react-components";
import type { EnumString, Size } from "@tntfx/core";
import { classNames, Style } from "@tntfx/theme";
import { useStyle } from "./divider.style";

type DividerProps = Omit<LibDividerProps, "appearance"> & {
  appearance?: LibDividerProps["appearance"] | "none";
  size?: EnumString<Size>;
};

export function Divider(props: DividerProps) {
  const { size, vertical, style, appearance = "none", className, ...rest } = props;

  const isTransparent = appearance === "none";
  const classes = useStyle();

  const innerStyle: CSSProperties = {};
  if (size) {
    // if (vertical) {
    innerStyle.minHeight = Style.tokens.size[size];
    innerStyle.height = Style.tokens.size[size];
    innerStyle.maxHeight = Style.tokens.size[size];
    // } else {
    innerStyle.minWidth = Style.tokens.size[size];
    innerStyle.width = Style.tokens.size[size];
    innerStyle.maxWidth = Style.tokens.size[size];
    // }
  }
  let libAppearance = isTransparent ? undefined : appearance;

  return (
    <LibDivider
      appearance={libAppearance}
      className={classNames(classes.root, isTransparent && classes.transparent, className)}
      style={{ ...innerStyle, ...style }}
      vertical={vertical}
      {...rest}
    />
  );
}
