import { Markdown } from "./markdown";
import { useStyle } from "./web-view-content.style";
import { useWebView } from "./web-view-provider";

export function WebViewContent() {
  const { activeContent } = useWebView();
  const classes = useStyle();

  return <Markdown className={classes.root}>{activeContent}</Markdown>;
}
