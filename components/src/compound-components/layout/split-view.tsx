import type { ReactNode } from "react";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./split-view.style";
import { Box } from "../../base-components";
import { Sidebar } from "../menu";

type SplitViewProps = {
  sideContent: ReactNode;
  className?: string;
  children?: ReactNode;
  isSideVisible?: boolean;
};

export function SplitView(props: SplitViewProps) {
  const { children, isSideVisible, sideContent, className, ...libProps } = props;
  const classes = useStyle();

  return (
    <Box className={classNames(classes.root, className)} {...libProps}>
      <Sidebar open={isSideVisible}>{sideContent}</Sidebar>

      <Box className={classes.content}>{children}</Box>
    </Box>
  );
}
