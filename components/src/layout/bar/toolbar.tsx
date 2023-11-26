import { type Actions, memoize, type OnAction } from "@tntfx/core";
import { Icon, type IconName } from "@tntfx/icons";
import { classNames, useParseProps } from "@tntfx/theme";
import { ActionBar } from "./action-bar";
import { ToolbarSection } from "./toolbar-section";
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

export const Toolbar = memoize(function Toolbar(props: ToolbarProps) {
  const { actions, onAction, children, icon, onIconClick, title, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  const hasTitlebar = Boolean(icon || title);

  return (
    <Box horizontal className={classNames("toolbar --noUserSelect", className)} role="toolbar" style={style}>
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
});
