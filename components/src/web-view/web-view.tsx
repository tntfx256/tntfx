import { classNames } from "@tntfx/theme";
import type { WebViewProps } from "./types";
import { WebViewBody } from "./web-view-body";
import { WebViewHeader } from "./web-view-header";
import { WebViewProvider } from "./web-view-provider";
import "./web-view.scss";

export function WebView(props: WebViewProps) {
  const { className } = props;

  return (
    <WebViewProvider {...props}>
      <div className={classNames("web-view", className)}>
        <WebViewHeader />
        <WebViewBody />
      </div>
    </WebViewProvider>
  );
}
