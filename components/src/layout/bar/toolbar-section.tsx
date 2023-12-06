import type { ToolbarGroupProps } from "@fluentui/react-components";
import { ToolbarGroup } from "@fluentui/react-components";
import { memoize } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./toolbar-section.style";

export type ToolbarSectionProps = ToolbarGroupProps;

export const ToolbarSection = memoize(function ToolbarSection(props: ToolbarSectionProps) {
  const { children, className, ...libProps } = props;
  const classes = useStyle();

  return (
    <ToolbarGroup className={classNames(classes.root, className)} {...libProps}>
      {children}
    </ToolbarGroup>
  );
});
