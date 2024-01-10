import type { ReactNode } from "react";
import type { MessageBarProps } from "@fluentui/react-components";
import { MessageBar, MessageBarActions, MessageBarBody } from "@fluentui/react-components";
import type { Actions, OnAction } from "@tntfx/core";
import { ActionBar } from "./bar";
import { Text } from "./text";

export type AlertProps = MessageBarProps & {
  title?: string;
  message?: string;
  actions?: Actions;
  onAction?: OnAction;
  children?: ReactNode;
};

export function Alert(props: AlertProps) {
  const { children, title, message, actions, onAction, ...libProps } = props;

  return (
    <MessageBar {...libProps}>
      <MessageBarBody>
        <Text>{title}</Text>
        {message && <Text>{message}</Text>}

        {children}
      </MessageBarBody>
      <MessageBarActions>
        <ActionBar actions={actions} onAction={onAction} />
      </MessageBarActions>
    </MessageBar>
  );
}
