import type { ClassAndChildren } from "@tntfx/core";
import { EnhancedProps, classNames, parseProps } from "@tntfx/theme";
import type { HTMLAttributes } from "react";
import "./text.scss";

type Att = HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> & Partial<EnhancedProps>;
type TypingProps = Att & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

export function Text(props: ClassAndChildren<TypingProps>) {
  const [className, { children, as, ...rest }] = parseProps(props);

  const Component = as || "p";

  return (
    <Component className={classNames("text", className)} {...rest}>
      {children}
    </Component>
  );
}
