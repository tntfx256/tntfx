import type { ToolbarProps as LibToolbarProps } from "@fluentui/react-components";
import { Toolbar as LibToolbar } from "@fluentui/react-components";
import { type Actions, memoize, type OnAction } from "@tntfx/core";
import { Icon, type IconName } from "@tntfx/icons";
import { classNames } from "@tntfx/theme";
import { ActionBar } from "./action-bar";
import { useStyle } from "./toolbar.style";
import { ToolbarSection } from "./toolbar-section";
import { Title } from "../../text";

type ToolbarProps = LibToolbarProps & {
  icon?: IconName;
  onIconClick?: () => void;
  title?: string;
  onClose?: () => void;
  onToggleMaximize?: () => void;

  actions?: Actions;
  onAction?: OnAction;
};

export const Toolbar = memoize(function Toolbar(props: ToolbarProps) {
  const { actions, onAction, children, icon, onIconClick, title, className, ...libProps } = props;
  const classes = useStyle();
  const hasTitlebar = Boolean(icon || title);

  return (
    <LibToolbar className={classNames(classes.root, className)} {...libProps}>
      {hasTitlebar && (
        <ToolbarSection>
          {icon && <Icon name={icon} onClick={onIconClick} />}
          <Title className={classes.title} size="sm">
            {title}
          </Title>
        </ToolbarSection>
      )}

      {children}

      <ActionBar actions={actions} onAction={onAction} />
    </LibToolbar>
  );
});
