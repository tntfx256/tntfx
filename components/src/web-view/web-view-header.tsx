import { createWebViewLink } from "@tntfx/core";
import { Icon } from "@tntfx/icons";
import { useWebView } from "./web-view-provider";
import { TextInput } from "../form/text-input";
import { Toolbar } from "../layout/bar/toolbar";
import { ToolbarSection } from "../layout/bar/toolbar-section";
import "./web-view.scss";

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
      <ToolbarSection>
        <Icon name="sidebar" onClick={handleSidebarToggle} />
        <Icon disabled={!history.canGoBack} name="back" onClick={history.goBack} />
        <Icon disabled={!history.canGoForward} name="forward" onClick={history.goForward} />
        <TextInput
          className="header-address"
          name="searchText"
          value={createWebViewLink(domain, history.activeItem || "", false)}
        />
      </ToolbarSection>
    </Toolbar>
  );
}
