import { type ReactNode } from "react";
import type { Actionable, IconName } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
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

export function Card<T extends string = string>(props: CardProps<T>) {
  const [className, { actions, headerSlot, onAction, ...rest }] = parseProps(props);

  return (
    <Frame
      isStatic
      className={classNames("card", className)}
      draggable={false}
      resizable={false}
      {...rest}
      slots={{
        header: headerSlot,
        footer: actions ? <ActionBar actions={actions} onAction={onAction} /> : undefined,
      }}
    />
  );
}
