import type { ReactNode } from "react";
import type { Actionable, ClassAndChildren, IconName } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { ActionBar } from "./bar/action-bar";
import { Toolbar } from "./bar/toolbar";
import { Box, BoxProps } from "./box";
import "./card.scss";
import { Frame } from "./frame";

export type CardProps<T extends string = string> = BoxProps &
  Actionable<T> & {
    title?: string;
    headerSlot?: ReactNode;
    icon?: IconName;
  };

export function Card<T extends string = string>(
  props: ClassAndChildren<CardProps<T>>
) {
  const {
    className,
    children,
    actions,
    // icon,
    headerSlot,
    // title,
    onAction,
    ...boxProps
  } = props;

  return (
    <Frame
      className={classNames("card", className)}
      {...boxProps}
      slots={{
        header: headerSlot,
        footer: actions ? (
          <ActionBar actions={actions} onAction={onAction} />
        ) : undefined,
      }}
    >
      {children}
    </Frame>
  );
}
