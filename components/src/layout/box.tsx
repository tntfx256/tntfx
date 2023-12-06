import type { AriaRole, ForwardedRef, MouseEvent } from "react";
import { forwardRef } from "react";
import { memoize, type PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useBoxClasses } from "./box.style";

export interface BoxProps extends PropsAndChildren {
  horizontal?: boolean;
  role?: AriaRole;
  onClick?: (e: MouseEvent) => void;
}

function BoxWithRef(props: BoxProps, ref: ForwardedRef<HTMLDivElement>) {
  const { className, horizontal, ...libProps } = props;
  const classes = useBoxClasses();

  return <div className={classNames(classes.box, horizontal && classes.horizontal, className)} {...libProps} ref={ref} />;
}

export const Box = memoize(forwardRef(BoxWithRef));
Box.displayName = "Box";
