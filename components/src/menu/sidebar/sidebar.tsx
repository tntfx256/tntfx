import type { ReactNode } from "react";
import { memoize, type PropsAndChildren } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import { Backdrop } from "../../backdrop";
import "./sidebar.scss";

export interface SidebarProps extends PropsAndChildren {
  overlay?: boolean;
  blur?: boolean;
  persistent?: boolean;
  isOpen?: boolean;
  onClickOutside?: () => void;
  slots?: {
    body?: ReactNode;
  };
}

export const Sidebar = memoize(function Sidebar(props: SidebarProps) {
  const { onClickOutside, persistent = true, overlay, isOpen, children, blur, slots = {}, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  const hasBody = !!slots.body;

  return (
    <Backdrop
      animation="slideRight"
      background="blur"
      className={classNames("sidebar__backdrop", { "--withBody": hasBody })}
      isOpen={hasBody || isOpen}
      overlay={hasBody ? false : overlay}
      persistent={persistent}
      style={style}
      onClick={hasBody ? undefined : onClickOutside}
    >
      <aside className={classNames("sidebar", className, { blur })} role="navigation">
        {isOpen || persistent ? children : null}
      </aside>
      {hasBody && <main className={classNames("sidebar__body")}>{slots.body}</main>}
    </Backdrop>
  );
});
