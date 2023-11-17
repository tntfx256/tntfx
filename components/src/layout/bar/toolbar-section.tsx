import type { WithChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import { memoize } from "../../memoize";
import type { BoxProps } from "../box";
import { Box } from "../box";
import "./toolbar-section.scss";

export type ToolbarSectionProps = WithChildren<BoxProps> & EnhancedProps;

export const ToolbarSection = memoize(function ToolbarSection(props: ToolbarSectionProps) {
  const [className, boxProps] = parseProps(props);

  return <Box horizontal className={classNames("toolbarSection --noUserSelect", className)} {...boxProps} />;
});
