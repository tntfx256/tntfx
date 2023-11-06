import type { Actions, IconName, OnAction } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { ActionBar } from "./action-bar";
import { ToolbarSection } from "./toolbar-section";
import { Icon } from "../../icon";
import { Text } from "../../typography";
import type { BoxProps } from "../box";
import { Box } from "../box";
import "./toolbar.scss";

type ToolbarProps = Omit<BoxProps, "horizontal"> & {
  icon?: IconName;
  onIconClick?: () => void;
  title?: string;
  onClose?: () => void;
  onToggleMaximize?: () => void;

  actions?: Actions;
  onAction?: OnAction;
};

export function Toolbar(props: ToolbarProps) {
  const [className, { actions, onAction, children, icon, onIconClick, title, ...boxProps }] = parseProps(props);

  const hasTitlebar = Boolean(icon || title);

  return (
    <Box horizontal className={classNames("toolbar --noUserSelect", className)} role="toolbar" {...boxProps}>
      {hasTitlebar && (
        <ToolbarSection className="toolbar__title">
          {icon && <Icon name={icon} size="md" onClick={onIconClick} />}
          <Text as="h1" fontSize="lg" role="heading">
            {title}
          </Text>
        </ToolbarSection>
      )}

      {children}

      <ActionBar actions={actions} onAction={onAction} />
    </Box>
  );
}
