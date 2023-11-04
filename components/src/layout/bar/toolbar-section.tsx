import type { WithChildren } from "@tntfx/core";
import { EnhancedProps, classNames, parseProps } from "@tntfx/theme";
import type { BoxProps } from "../box";
import { Box } from "../box";
import "./toolbar-section.scss";

export type ToolbarSectionProps = WithChildren<BoxProps> & EnhancedProps;

export function ToolbarSection(props: ToolbarSectionProps) {
  const [className, boxProps] = parseProps(props);

  return <Box horizontal className={classNames("toolbarSection", className)} {...boxProps} />;
}
