import { useWebView } from "./web-view-provider";
import { MenuList } from "../menu/menu-list";

export function WebViewSidebar() {
  const { onLinkClick, links, history } = useWebView();

  function handleLinkClick(link: string) {
    onLinkClick(link);
  }

  return <MenuList items={links} selected={history.activeItem} onClick={handleLinkClick} />;
}
