import type { HTMLAttributes } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import { memoize } from "../memoize";
import "./text.scss";

type Att = Omit<HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>, "contentEditable"> & Partial<EnhancedProps>;
type TypingProps = Att & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

export const Text = memoize(function Text(props: ClassAndChildren<TypingProps>) {
  const [className, { children, as, ...rest }] = parseProps(props);

  const Component = as || "p";

  return (
    <Component className={classNames("text", className)} {...rest}>
      {children}
    </Component>
  );
});
