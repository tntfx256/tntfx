import type { Dispatch, PropsWithRef, ReactElement, ReactNode, SetStateAction } from "react";
import type { DialogProps as LibDialogProps } from "@fluentui/react-components";
import type { Actionable, Dimension } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import type { BoxProps } from "../../../base-components";

export enum DialogStatus {
  Normal = "normal",
  Maximized = "maximized",
}

export type SetDimension = Dispatch<SetStateAction<Dimension | undefined>>;

export interface DialogProps<T extends string = string> extends BoxProps, Omit<LibDialogProps, "children">, Actionable<T> {
  className?: string;
  draggable?: boolean;
  resizable?: boolean;
  title?: string;
  icon?: IconName;
  boundary?: Dimension;
  isActive?: boolean;

  // type?: MessageType;
  persistent?: boolean;
  isBlocking?: boolean;
  // background?: BackdropProps["background"];

  slots?: {
    trigger?: ReactElement<PropsWithRef<HTMLElement>>;
    header?: ReactNode;
    titlebar?: ReactNode;
    sidebar?: ReactNode;
    footer?: ReactNode;
  };

  slotProps?: {
    sidebar?: {
      isInitiallyOpen?: boolean;
      isAlwaysOpen?: boolean;
    };
  };

  // events
  onClose?: () => void;
}
