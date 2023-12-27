import { createWebViewLink } from "@tntfx/core";
import { Icon } from "@tntfx/icons";
import { useWebView } from "./web-view-provider";
import { TextInput } from "../form/text-input";
import { Toolbar, ToolbarGroup } from "../layout/bar/toolbar";

type WebViewHeaderProps = {
  onSidebarToggle?: () => void;
};

export function WebViewHeader(props: WebViewHeaderProps) {
  const { onSidebarToggle } = props;
  const { history, domain, onToggleMenu } = useWebView();

  function handleSidebarToggle() {
    if (onSidebarToggle) {
      onSidebarToggle();
    } else {
      onToggleMenu();
    }
  }

  return (
    <Toolbar>
      <ToolbarGroup>
        <Icon name="PanelLeft" onClick={handleSidebarToggle} />
        <Icon disabled={!history.canGoBack} name="Previous" onClick={history.goBack} />
        <Icon disabled={!history.canGoForward} name="Next" onClick={history.goForward} />
        <TextInput
          className="header-address"
          name="searchText"
          value={createWebViewLink(domain, history.activeItem || "", false)}
        />
      </ToolbarGroup>
    </Toolbar>
  );
}
