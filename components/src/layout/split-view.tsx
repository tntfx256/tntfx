import type { PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Box } from "./box";
import { useStyle } from "./split-view.style";
import { Sidebar } from "../menu/sidebar/sidebar";

type SplitViewProps = PropsAndChildren & {
  className?: string;
  sideContent: PropsAndChildren["children"];
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
