import type { ReactNode } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Backdrop } from "../../backdrop";
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

export function Sidebar(props: ClassAndChildren<SidebarProps>) {
  const { className, onClickOutside, persistent = true, overlay, isOpen, children, blur, slots = {} } = props;

  const hasBody = !!slots.body;

  return (
    <Backdrop
      animation="slide-right"
      background="blur"
      className={classNames("sidebar-backdrop", { "__with-body": hasBody }, [className, "-backdrop"])}
      isOpen={hasBody || isOpen}
      overlay={hasBody ? false : overlay}
      onClick={hasBody ? undefined : onClickOutside}
    >
      <aside className={classNames("sidebar", className, { blur })}>{isOpen || persistent ? children : null}</aside>
      {hasBody && <main className={classNames("sidebar-body", [className, "-body"])}>{slots.body}</main>}
    </Backdrop>
  );
}
