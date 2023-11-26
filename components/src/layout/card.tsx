import { type ReactNode } from "react";
import { type Actionable, memoize } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import { classNames, useParseProps } from "@tntfx/theme";
import { ActionBar } from "./bar/action-bar";
import { Frame } from "./frame";
import type { FrameProps } from "./frame/types";
import "./card.scss";

export type CardProps<T extends string = string> = FrameProps &
  Actionable<T> & {
    title?: string;
    headerSlot?: ReactNode;
    icon?: IconName;
  };

export const Card = memoize(function Card<T extends string = string>(props: CardProps<T>) {
  const { actions, headerSlot, onAction, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <Frame
      isStatic
      className={classNames("card", className)}
      draggable={false}
      id="card-frame"
      resizable={false}
      style={style}
      slots={{
        header: headerSlot,
        footer: actions ? <ActionBar actions={actions} onAction={onAction} /> : undefined,
      }}
    />
  );
}) as <T extends string = string>(props: CardProps<T>) => ReactNode;
