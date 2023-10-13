import type { PropsWithChildren, ReactNode } from "react";
import { useCallback } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import { initStore } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { Backdrop } from "../backdrop";
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
      className={classNames("sidebar-backdrop", "__with-body", [className, "-backdrop"])}
      isOpen={hasBody || isOpen}
      overlay={hasBody ? false : overlay}
      onClick={hasBody ? undefined : onClickOutside}
    >
      <aside className={classNames("sidebar", className, { blur })}>{isOpen || persistent ? children : null}</aside>
      {hasBody && <main className={classNames("sidebar-body", [className, "-body"])}>{slots.body}</main>}
    </Backdrop>
  );
}

type SidebarState = { visible: boolean };
const { useStore, StoreProvider } = initStore<SidebarState>({ name: "sidebar" });

export function SidebarProvider(props: PropsWithChildren) {
  return <StoreProvider visible={false}>{props.children}</StoreProvider>;
}

export function useSidebar() {
  const [state, setState] = useStore();

  const show = useCallback(() => setState({ visible: true }), [setState]);
  const hide = useCallback(() => setState({ visible: false }), [setState]);
  const toggle = useCallback(() => setState((s) => ({ visible: !s.visible })), [setState]);

  return { visible: state.visible, show, hide, toggle };
}

export function ConnectedSidebar(props: ClassAndChildren<Omit<SidebarProps, "isOpen" | "onClickOutside">>) {
  const { visible, hide } = useSidebar();

  return <Sidebar {...props} isOpen={visible} onClickOutside={hide} />;
}
