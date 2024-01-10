import type { CSSProperties } from "react";
import {
  Link as LibLink,
  type LinkProps as LibLinkProps,
  Text as LibText,
  type TextProps as LibTextProps,
} from "@fluentui/react-components";
import type { Any, EnumString } from "@tntfx/core";
import { Size } from "@tntfx/core";

export type TextProps = Omit<LibTextProps, "size" | "weight"> & {
  size?: EnumString<Size>;
  weight?: EnumString<Size>;
};

const WeightMap: Record<Size, CSSProperties["fontWeight"]> = {
  [Size.xxs]: 100,
  [Size.xs]: 200,
  [Size.sm]: 300,
  [Size.md]: 400,
  [Size.lg]: 500,
  [Size.xl]: 600,
  [Size.xxl]: 700,
  [Size.xxxl]: 900,
};

const SizeValueMap: Record<Size, LibTextProps["size"]> = {
  [Size.xxs]: 100,
  [Size.xs]: 200,
  [Size.sm]: 300,
  [Size.md]: 400,
  [Size.lg]: 500,
  [Size.xl]: 600,
  [Size.xxl]: 700,
  [Size.xxxl]: 900,
};

const SizeElementMap = {
  [Size.xxs]: "small",
  [Size.xs]: "small",
  [Size.sm]: "p",
  [Size.md]: "p",
  [Size.lg]: "h4",
  [Size.xl]: "h3",
  [Size.xxl]: "h2",
  [Size.xxxl]: "h1",
};

export function Text(props: TextProps) {
  const { size, color, style, weight, as, ...libProps } = props;

  (libProps as TextProps).style = { color, fontWeight: WeightMap[weight ?? size ?? Size.sm], ...style };

  const libSize = SizeValueMap[size ?? Size.md];
  const libAs = as || (SizeElementMap[size ?? Size.md] as Any);

  return <LibText as={libAs} size={libSize} style={style} {...libProps} />;
}

type LinkProps = LibLinkProps & {};
export function Link(props: LinkProps) {
  return <LibLink {...props} />;
}
