import type { Actions, IconName, OnAction, WithChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames } from "@tntfx/theme";
import { ActionBar } from "./layout";
import { Box } from "./layout/box";
import { Svg } from "./svg";
import { Text } from "./typography/text";
import "./alert.scss";

export type AlertProps = EnhancedProps & {
  icon?: IconName;
  title?: string;
  message?: string;
  actions?: Actions;
  onAction?: OnAction;
};

export function Alert(props: WithChildren<AlertProps>) {
  const { children, className, icon, title, message, actions, onAction, ...boxProps } = props;

  return (
    <Box horizontal className={classNames("alert", className)} {...boxProps}>
      {icon && <Svg className="alert-icon" name={icon} />}
      <Box>
        <Text className="alert-title">{title}</Text>

        {message && (
          <Text className="alert-desc" fontSize="sm">
            {message}
          </Text>
        )}
        {children}
      </Box>
      <ActionBar actions={actions} onAction={onAction} />
    </Box>
  );
}
