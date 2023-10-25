import type { ForwardedRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import "./box.scss";

export type BoxProps = HTMLAttributes<HTMLDivElement> & Partial<EnhancedProps>;

function BoxWithRefs(props: ClassAndChildren<BoxProps>, ref: ForwardedRef<HTMLDivElement>) {
  const { children, ...libProps } = props;
  const result = useParseProps(libProps);

  return (
    <div className={classNames("box", result.className)} ref={ref} style={result.style} {...result.props}>
      {children}
    </div>
  );
}

export const Box = forwardRef(BoxWithRefs);
Box.displayName = "Box";
