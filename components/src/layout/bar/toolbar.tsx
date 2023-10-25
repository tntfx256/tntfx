import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import type { Actions, IconName, OnAction } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { ActionBar, useActions } from "./action-bar";
import { ToolbarControls } from "./toolbar-controls";
import { ToolbarSection } from "./toolbar-section";
import { Icon } from "../../icon";
import { Text } from "../../typography";
import type { BoxProps } from "../box";
import { Box } from "../box";
import "./toolbar.scss";

type ToolbarProps = Omit<BoxProps, "horizontal"> & {
  as?: "header" | "footer";

  icon?: IconName;
  onIconClick?: () => void;
  title?: string;
  onClose?: () => void;

  actions?: Actions;
  onAction?: OnAction;
};

function ToolbarWithRef(props: ToolbarProps, ref: ForwardedRef<HTMLDivElement>) {
  const { actions, onAction, className, children, as, icon = "", onIconClick, title, onClose, ...boxProps } = props;

  const hasTitlebar = Boolean(icon || title);

  return (
    <Box horizontal className={classNames("toolbar", `_as-${as}`, className)} ref={ref} {...boxProps}>
      {hasTitlebar && (
        <ToolbarSection className="toolbar-title">
          <Icon name={icon} onClick={onIconClick} />
          <Text as="h1">{title}</Text>
        </ToolbarSection>
      )}

      {children}

      <ActionBar actions={actions} onAction={onAction} />

      <ToolbarControls onClose={onClose} />
    </Box>
  );
}

export const Toolbar = forwardRef(ToolbarWithRef);
