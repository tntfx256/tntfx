import { WebViewContent } from "./web-view-content";
import { useWebView } from "./web-view-provider";
import { WebViewSidebar } from "./web-view-sidebar";
import { SplitView } from "../layout/split-view";

export function WebViewBody() {
  const { isMenuVisible } = useWebView();

  return (
    <SplitView isSideVisible={isMenuVisible} sideContent={<WebViewSidebar />}>
      <WebViewContent />
    </SplitView>
  );
}
