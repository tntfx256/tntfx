import type { AriaRole, ForwardedRef, MouseEvent } from "react";
import { forwardRef } from "react";
import { memoize, type PropsAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import "./box.scss";

export interface BoxProps extends PropsAndChildren, EnhancedProps {
  role?: AriaRole;
  onClick?: (e: MouseEvent) => void;
}

function BoxWithRef(props: BoxProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, onClick, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <div className={classNames("box", className)} ref={ref} style={style} onClick={onClick}>
      {children}
    </div>
  );
}

export const Box = memoize(forwardRef(BoxWithRef));
Box.displayName = "Box";
