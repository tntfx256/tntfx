import type { Actions, IconName, OnAction } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Icon } from "../../icon";
import { Text } from "../../typography";
import type { BoxProps } from "../box";
import { Box } from "../box";
import { ActionBar } from "./action-bar";
import { ToolbarSection } from "./toolbar-section";
import "./toolbar.scss";

type ToolbarProps = Omit<BoxProps, "horizontal"> & {
  as?: "header" | "footer";

  icon?: IconName;
  onIconClick?: () => void;
  title?: string;
  onClose?: () => void;
  onToggleMaximize?: () => void;

  actions?: Actions;
  onAction?: OnAction;
};

function ToolbarWithRef(
  props: ToolbarProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    actions,
    onAction,
    className,
    children,
    as,
    icon = "",
    onIconClick,
    title,

    ...boxProps
  } = props;

  const hasTitlebar = Boolean(icon || title);

  return (
    <Box
      horizontal
      className={classNames("toolbar", `_as-${as}`, className)}
      ref={ref}
      role="toolbar"
      {...boxProps}
    >
      {hasTitlebar && (
        <ToolbarSection className="toolbar-title">
          <Icon size="lg" name={icon} onClick={onIconClick} />
          <Text as="h1" role="heading">
            {title}
          </Text>
        </ToolbarSection>
      )}

      {children}

      <ActionBar actions={actions} onAction={onAction} />
    </Box>
  );
}

export const Toolbar = forwardRef(ToolbarWithRef);
