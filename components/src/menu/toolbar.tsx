import type { ForwardedRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";
import { forwardRef, memo } from "react";
import type { ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { BoxProps } from "../layout/box";
import { Box } from "../layout/box";
import "./toolbar.scss";

type ToolbarProps = ClassAndChildren;

type ToolbarType = ForwardRefExoticComponent<PropsWithoutRef<ToolbarProps> & RefAttributes<HTMLDivElement>> & {
  Section: typeof ToolbarSection;
  Title: typeof ToolbarTitle;
  Control: typeof ToolbarControls;
};

export const Toolbar = forwardRef(function Toolbar(props: ToolbarProps, ref: ForwardedRef<HTMLDivElement>) {
  const { className, children } = props;

  return (
    <Box horizontal className={classNames("toolbar", className)} ref={ref}>
      {children}
    </Box>
  );
}) as ToolbarType;

const ToolbarSection = memo(function ToolbarSection(props: ClassAndChildren<BoxProps>) {
  const { className, children, ...box } = props;
  return (
    <Box horizontal className={classNames("toolbar-section", className)} {...box}>
      {children}
    </Box>
  );
});

function ToolbarTitle(props: ClassAndChildren) {
  return (
    <Box horizontal className={classNames("toolbar-title", props.className)}>
      {props.children}
    </Box>
  );
}

function ToolbarControls(props: ClassAndChildren) {
  return (
    <Box horizontal className={classNames("toolbar-controls", props.className)}>
      {props.children}
    </Box>
  );
}

Toolbar.Section = ToolbarSection;
Toolbar.Title = ToolbarTitle;
Toolbar.Control = ToolbarControls;
