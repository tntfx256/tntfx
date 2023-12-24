import type { AriaRole, CSSProperties, ForwardedRef, MouseEvent } from "react";
import { forwardRef } from "react";
import { memoize, type PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useBoxClasses } from "./box.style";

export interface BoxProps extends PropsAndChildren {
  horizontal?: boolean;
  role?: AriaRole;
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  onClick?: (e: MouseEvent) => void;
}

function BoxWithRef(props: BoxProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, className, horizontal, justifyContent, alignItems, style, ...libProps } = props;

  const libStyle = { justifyContent, alignItems, ...style };
  const classes = useBoxClasses();

  return (
    <div
      className={classNames(classes.box, horizontal && classes.horizontal, className)}
      style={libStyle}
      {...libProps}
      ref={ref}
    >
      {children}
    </div>
  );
}

export const Box = memoize(forwardRef(BoxWithRef));
Box.displayName = "Box";
