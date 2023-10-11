import type { Actions, ClassAndChildren, IconName, MessageType, OnAction } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { ActionBar } from "./layout/action-bar";
import { Box } from "./layout/box";
import { Svg } from "./svg";
import { Text } from "./typography/text";
import "./alert.scss";

export type AlertProps = {
  icon?: IconName;
  type?: MessageType;
  title?: string;
  message?: string;
  actions?: Actions;
  onAction?: OnAction;
};

export function Alert(props: ClassAndChildren<AlertProps>) {
  const { className, children, title, message, actions, onAction, type = "info", icon } = props;

  return (
    <Box horizontal className={classNames("alert", className, `type-${type}`)}>
      {icon && <Svg className="alert-icon" name={icon} />}
      <Box>
        <Text className="alert-title">{title}</Text>

        {message && (
          <Text className="alert-desc" size="small">
            {message}
          </Text>
        )}
        {children}
      </Box>
      <ActionBar actions={actions} onAction={onAction} />
    </Box>
  );
}
