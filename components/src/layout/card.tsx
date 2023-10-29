import type { Actionable, ClassAndChildren, IconName } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { ReactNode } from "react";
import { ActionBar } from "./bar/action-bar";
import "./card.scss";
import { Frame } from "./frame";
import { FrameProps } from "./frame/frame";

export type CardProps<T extends string = string> = FrameProps &
  Actionable<T> & {
    title?: string;
    headerSlot?: ReactNode;
    icon?: IconName;
  };

export function Card<T extends string = string>(
  props: ClassAndChildren<CardProps<T>>
) {
  const { className, children, actions, headerSlot, onAction, ...boxProps } =
    props;

  return (
    <Frame
      isStatic
      draggable={false}
      resizable={false}
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
