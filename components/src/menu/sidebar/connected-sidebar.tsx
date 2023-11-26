import { Sidebar, type SidebarProps } from "./sidebar";
import { useSidebar } from "./sidebar-provider";

export function ConnectedSidebar(props: Omit<SidebarProps, "isOpen" | "onClickOutside">) {
  const { visible, hide } = useSidebar();

  return <Sidebar {...props} isOpen={visible} onClickOutside={hide} />;
}
