import type { ForwardedRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useStyle } from "@tntfx/theme";
import "./box.scss";

export type BoxProps = HTMLAttributes<HTMLDivElement> &
  EnhancedProps & { horizontal?: boolean; draggable?: boolean; resizable?: boolean };

// export const Box = memo(
export const Box = forwardRef(function Box(props: ClassAndChildren<BoxProps>, ref: ForwardedRef<HTMLDivElement>) {
  const { className, children, horizontal, draggable, resizable, ...libProps } = props;

  const result = useStyle(libProps);

  return (
    <div
      style={result.style}
      {...result.props}
      className={classNames("box", { horizontal, draggable, resizable }, className)}
      ref={ref}
    >
      {children}
    </div>
  );
});
// );
