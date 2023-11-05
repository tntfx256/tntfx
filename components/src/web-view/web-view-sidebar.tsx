import { useWebView } from "./web-view-provider";
import { Menu } from "../menu";

export function WebViewSidebar() {
  const { onLinkClick, links, history } = useWebView();

  function handleLinkClick(link: string) {
    onLinkClick(link);
  }

  return <Menu items={links} selected={history.activeItem} onClick={handleLinkClick} />;
}
