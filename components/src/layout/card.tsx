import type { ReactNode } from "react";
import type { Actionable, ClassAndChildren, IconName } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { ActionBar } from "./action-bar";
import { Box } from "./box";
import { Icon } from "../icon";
import { Toolbar } from "../menu/toolbar";
import { Text } from "../typography/text";
import "./card.scss";

type CardProps<T extends string = string> = Actionable<T> & {
  title?: string;
  headerSlot?: ReactNode;
  icon?: IconName;
};

export function Card<T extends string = string>(props: ClassAndChildren<CardProps<T>>) {
  const { className, children, actions, icon, headerSlot, title, onAction } = props;

  const hasHeader = Boolean(title || icon || headerSlot);

  return (
    <Box className={classNames("card", className)}>
      <Box className="card-body">{children}</Box>
      <ActionBar<T> actions={actions} className="card-footer" onAction={onAction} />
      {hasHeader && (
        <Toolbar className="card-header">
          <Toolbar.Title>
            {icon && <Icon name={icon} />}
            {title && <Text>{title}</Text>}
            {headerSlot}
          </Toolbar.Title>
        </Toolbar>
      )}
    </Box>
  );
}
