import type { ClassAndChildren, Size } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import "./spacer.scss";

export type SpacerProps = {
  flex?: boolean;
  horizontal?: boolean;
  width?: string;
  height?: string;
  size?: Size;
};

export function Spacer(props: ClassAndChildren<SpacerProps>) {
  const [className, { children, ...rest }] = parseProps(props);

  return (
    <div className={classNames("spacer", className)} {...rest}>
      {children}
    </div>
  );
}
