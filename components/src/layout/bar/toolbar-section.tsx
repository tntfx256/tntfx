import type { ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { BoxProps } from "../box";
import { Box } from "../box";
import "./toolbar-section.scss";

export type ToolbarSectionProps = ClassAndChildren<BoxProps>;

export function ToolbarSection(props: ToolbarSectionProps) {
  const { className, children, ...box } = props;

  return (
    <Box horizontal className={classNames("toolbar-section", className)} {...box}>
      {children}
    </Box>
  );
}
