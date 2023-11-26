import { memoize, type PropsAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import type { BoxProps } from "../box";
import { Box } from "../box";
import "./toolbar-section.scss";

export interface ToolbarSectionProps extends PropsAndChildren, BoxProps, EnhancedProps {}

export const ToolbarSection = memoize(function ToolbarSection(props: ToolbarSectionProps) {
  const { children, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <Box horizontal className={classNames("toolbarSection --noUserSelect", className)} style={style}>
      {children}
    </Box>
  );
});
