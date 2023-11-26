import type { Actions, OnAction, PropsAndChildren } from "@tntfx/core";
import { Icon, type IconName } from "@tntfx/icons";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import { ActionBar } from "./layout";
import { Box } from "./layout/box";
import { Text } from "./typography/text";
import "./alert.scss";

export interface AlertProps extends EnhancedProps, PropsAndChildren {
  icon?: IconName;
  title?: string;
  message?: string;
  actions?: Actions;
  onAction?: OnAction;
}

export function Alert(props: AlertProps) {
  const { children, icon, title, message, actions, onAction, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <Box horizontal className={classNames("alert", className)} style={style}>
      {icon && <Icon className="alert__icon" name={icon} />}
      <Box className="alert__content">
        <Text as="h1" className="alert__title">
          {title}
        </Text>

        {message && <Text className="alert__message">{message}</Text>}
        {children}
      </Box>
      <ActionBar actions={actions} className="alert__actions" onAction={onAction} />
    </Box>
  );
}
