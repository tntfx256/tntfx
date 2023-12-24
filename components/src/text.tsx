import type { CSSProperties } from "react";
import {
  Body1,
  Body2,
  Caption1,
  Caption2,
  Display,
  LargeTitle,
  Subtitle1,
  Subtitle2,
  type TextProps as LibTextProps,
  Title1,
  Title2,
  Title3,
} from "@fluentui/react-components";
import type { EnumString } from "@tntfx/core";
import { Size } from "@tntfx/core";

export type TextProps = Omit<LibTextProps, "size"> & {
  size?: EnumString<Size>;
  textAlign?: CSSProperties["textAlign"];
};

export function Title(props: TextProps) {
  const { size, textAlign, color, style, ...libProps } = props;

  (libProps as TextProps).style = { textAlign, color, ...style };

  switch (size) {
    case Size.xs:
      return <Subtitle2 as="h5" {...libProps} />;
    case Size.sm:
      return <Subtitle1 as="h4" {...libProps} />;
    case Size.md:
      return <Title3 as="h3" {...libProps} />;
    case Size.lg:
      return <Title2 as="h2" {...libProps} />;
    case Size.xl:
      return <Title1 as="h1" {...libProps} />;
    case Size.xxl:
      return <LargeTitle as="h1" {...libProps} />;
    case Size.xxxl:
      return <Display as="h1" {...libProps} />;

    default:
      return <Title3 as="h2" {...libProps} />;
  }
}

export function Text(props: TextProps) {
  const { size, textAlign, color, style, ...libProps } = props;

  (libProps as TextProps).style = { textAlign, color, ...style };

  switch (size) {
    case Size.xs:
      return <Caption2 as="em" {...libProps} />;
    case Size.sm:
      return <Caption1 as="em" {...libProps} />;
    case Size.md:
      return <Body1 as="p" {...libProps} />;
    case Size.lg:
      return <Body2 as="p" {...libProps} />;

    default:
      return <Body1 as="p" {...libProps} />;
  }
}
