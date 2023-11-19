import type { Actions, IconName, OnAction, WithChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
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
  const [className, { children, icon, title, message, actions, onAction, ...boxProps }] = parseProps(props);

  return (
    <Box horizontal className={classNames("alert", className)} {...boxProps}>
      {icon && <Svg className="alert__icon" name={icon} />}
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
