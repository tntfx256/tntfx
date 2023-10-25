import type { PropsWithChildren } from "react";
import { useCallback } from "react";
import { initStore } from "@tntfx/hooks";

type SidebarState = { visible: boolean };
const { useStore, StoreProvider } = initStore<SidebarState>({ name: "sidebar" });

export function SidebarProvider(props: PropsWithChildren) {
  return <StoreProvider visible={false}>{props.children}</StoreProvider>;
}

export function useSidebar() {
  const [state, setState] = useStore();

  console.log(state);

  const show = useCallback(() => setState({ visible: true }), [setState]);
  const hide = useCallback(() => setState({ visible: false }), [setState]);
  const toggle = useCallback(() => setState((s) => ({ visible: !s.visible })), [setState]);

  return { visible: state.visible, show, hide, toggle };
}
