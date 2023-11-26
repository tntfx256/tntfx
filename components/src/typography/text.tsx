import type { HTMLAttributes } from "react";
import { memoize, type PropsAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import "./text.scss";

type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type Att = Omit<HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>, "contentEditable"> & Partial<EnhancedProps>;

export interface TextProps extends PropsAndChildren, Att {
  as?: TextElement;
}

export const Text = memoize(function Text(props: TextProps) {
  const { children, as, ...rest } = props;
  const { className, style } = useParseProps(rest);

  const Component = as || "p";

  return (
    <Component className={classNames("text", className)} style={style}>
      {children}
    </Component>
  );
});
