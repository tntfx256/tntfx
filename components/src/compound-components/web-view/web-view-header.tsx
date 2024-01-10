import { createWebViewLink } from "@tntfx/core";
import { useStyle } from "./web-view-header.style";
import { useWebView } from "./web-view-provider";
import { Icon } from "../../base-components";
import { Toolbar, ToolbarGroup } from "../../base-components/bar/toolbar";
import { TextInput } from "../form/text-input";

type WebViewHeaderProps = {
  onSidebarToggle?: () => void;
};

export function WebViewHeader(props: WebViewHeaderProps) {
  const { onSidebarToggle } = props;
  const { history, domain, onToggleMenu } = useWebView();
  const classes = useStyle();

  function handleSidebarToggle() {
    if (onSidebarToggle) {
      onSidebarToggle();
    } else {
      onToggleMenu();
    }
  }

  return (
    <Toolbar className={classes.root}>
      <ToolbarGroup className={classes.actions}>
        <Icon name="PanelLeft" onClick={handleSidebarToggle} />
        <Icon disabled={!history.canGoBack} name="Previous" onClick={history.goBack} />
        <Icon disabled={!history.canGoForward} name="Next" onClick={history.goForward} />
      </ToolbarGroup>

      <ToolbarGroup className={classes.addressBar}>
        <TextInput
          readOnly
          className={classes.addressInput}
          value={createWebViewLink(domain, history.activeItem || "", false)}
        />
      </ToolbarGroup>
    </Toolbar>
  );
}
