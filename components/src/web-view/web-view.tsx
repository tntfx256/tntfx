import { classNames } from "@tntfx/theme";
import type { WebViewProps } from "./types";
import { useStyle } from "./web-view.style";
import { WebViewBody } from "./web-view-body";
import { WebViewHeader } from "./web-view-header";
import { WebViewProvider } from "./web-view-provider";
import { Box } from "../layout";

export function WebView(props: WebViewProps) {
  const { className } = props;

  const classes = useStyle();

  return (
    <WebViewProvider {...props}>
      <Box className={classNames(classes.root, className)}>
        <WebViewHeader />
        <WebViewBody />
      </Box>
    </WebViewProvider>
  );
}
