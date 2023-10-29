import type { CSSProperties, HTMLAttributes } from "react";
import type { ClassAndChildren, Size, Variant } from "@tntfx/core";
import { splitProperties } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import "./text.scss";

type Att = HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>;
type TypingProps = Att & {
  color?: CSSProperties["color"];
  fontWeight?: CSSProperties["fontWeight"];
  textAlign?: CSSProperties["textAlign"];
  size?: Size;
  whiteSpace?: CSSProperties["whiteSpace"];
  variant?: Variant;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const pickProps = splitProperties(
  "color",
  "fontWeight",
  "textAlign",
  "whiteSpace"
);

export function Text(props: ClassAndChildren<TypingProps>) {
  const { children, as, ...libProps } = props;

  const result = useParseProps(libProps);

  const Component = as || SizeMap[props.size || "md"];

  return (
    <Component
      className={classNames("text", result.className)}
      style={result.style}
      {...result.props}
    >
      {children}
    </Component>
  );
}

const SizeMap: Record<Size, keyof JSX.IntrinsicElements> = {
  "3xs": "p",
  "2xs": "p",
  xs: "p",
  sm: "p",
  md: "p",
  lg: "h4",
  xl: "h3",
  "2xl": "h2",
  "3xl": "h2",
  "4xl": "h1",
  "5xl": "h1",
  "6xl": "h1",
};
