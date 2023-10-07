import type { CSSProperties } from "react";
import type { ClassAndChildren, Size } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import "./spacer.scss";

export type SpacerProps = {
  flex?: boolean;
  horizontal?: boolean;
  width?: string;
  height?: string;
  size?: Size;
};

export function Spacer(props: ClassAndChildren<SpacerProps>) {
  const { horizontal, flex, className, children, width, height, size } = props;

  const style: CSSProperties = { width, height };

  return (
    <div className={classNames("spacer", className, `size-${size}`, { flex, horizontal })} style={style}>
      {children}
    </div>
  );
}
