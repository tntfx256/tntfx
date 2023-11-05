import type { ClassAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import "./spacer.scss";

export type SpacerProps = EnhancedProps;

export function Spacer(props: ClassAndChildren<SpacerProps>) {
  const [className, { children, ...rest }] = parseProps(props);

  return (
    <div className={classNames("spacer", className)} {...rest}>
      {children}
    </div>
  );
}
