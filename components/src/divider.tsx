import type { PropsAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import "./divider.scss";

export type DividerProps = PropsAndChildren & EnhancedProps;

export function Divider(props: DividerProps) {
  const { children, ...rest } = props;
  const { className, style } = useParseProps(rest);

  return (
    <div className={classNames("divider", className)} style={style}>
      {children}
    </div>
  );
}
