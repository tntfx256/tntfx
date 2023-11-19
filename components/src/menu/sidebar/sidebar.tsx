import type { ReactNode } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { Backdrop } from "../../backdrop";
import { memoize } from "../../memoize";
import "./sidebar.scss";

export type SidebarProps = {
  overlay?: boolean;
  blur?: boolean;
  persistent?: boolean;
  isOpen?: boolean;
  onClickOutside?: () => void;
  slots?: {
    body?: ReactNode;
  };
};

export const Sidebar = memoize(function Sidebar(props: ClassAndChildren<SidebarProps>) {
  const [className, { onClickOutside, persistent = true, overlay, isOpen, children, blur, slots = {} }] = parseProps(props);

  const hasBody = !!slots.body;

  return (
    <Backdrop
      animation="slideRight"
      background="blur"
      className={classNames("sidebar__backdrop", { "--withBody": hasBody })}
      isOpen={hasBody || isOpen}
      overlay={hasBody ? false : overlay}
      persistent={persistent}
      onClick={hasBody ? undefined : onClickOutside}
    >
      <aside className={classNames("sidebar", className, { blur })}>{isOpen || persistent ? children : null}</aside>
      {hasBody && <main className={classNames("sidebar__body")}>{slots.body}</main>}
    </Backdrop>
  );
});
