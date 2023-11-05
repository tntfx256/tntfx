import type { ForwardedRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import "./box.scss";

export type BoxProps = HTMLAttributes<HTMLDivElement> & EnhancedProps;

function BoxWithRefs(props: ClassAndChildren<BoxProps>, ref: ForwardedRef<HTMLDivElement>) {
  const [className, libProps] = parseProps(props);

  return <div className={classNames("box", className)} ref={ref} {...libProps} />;
}

export const Box = forwardRef(BoxWithRefs);
Box.displayName = "Box";
