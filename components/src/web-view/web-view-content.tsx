import { Markdown } from "./markdown";
import { useWebView } from "./web-view-provider";

export function WebViewContent() {
  const { activeContent } = useWebView();

  return <Markdown>{activeContent}</Markdown>;
}
