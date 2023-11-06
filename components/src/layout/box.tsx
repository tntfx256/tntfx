import type { ForwardedRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { WithChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import "./box.scss";

export type BoxProps = Omit<HTMLAttributes<HTMLDivElement>, "contentEditable"> & EnhancedProps;

function BoxWithRefs(props: WithChildren<BoxProps>, ref: ForwardedRef<HTMLDivElement>) {
  const [className, libProps] = parseProps(props);

  return <div className={classNames("box", className)} ref={ref} {...libProps} />;
}

export const Box = forwardRef(BoxWithRefs);
Box.displayName = "Box";
