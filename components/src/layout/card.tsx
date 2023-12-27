import { type ReactNode } from "react";
import type { CardProps as LibCardProps } from "@fluentui/react-components";
import { Card as LibCard } from "@fluentui/react-components";
import { type Actionable, memoize } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import { classNames, useParseProps } from "@tntfx/theme";
import { ActionBar } from "./bar/action-bar";

export interface CardProps<T extends string = string> extends LibCardProps, Actionable<T> {
  title?: string;
  headerSlot?: ReactNode;
  icon?: IconName;
}

export const Card2 = memoize(function Card<T extends string = string>(props: CardProps<T>) {
  const { actions, headerSlot, onAction, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <LibCard
      className={classNames("card", className)}
      draggable={false}
      style={style}
      // slots={{
      //   header: headerSlot,
      //   footer: actions ? <ActionBar actions={actions} onAction={onAction} /> : undefined,
      // }}
    />
  );
}) as <T extends string = string>(props: CardProps<T>) => ReactNode;
