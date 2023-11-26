import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Dimension } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import type { BoxProps } from "../box";

export enum FrameStatus {
  Normal = "normal",
  Maximized = "maximized",
}

export type SetDimension = Dispatch<SetStateAction<Dimension | undefined>>;

export interface FrameProps extends Omit<BoxProps, "id"> {
  id: string;
  draggable?: boolean;
  resizable?: boolean;
  title?: string;
  icon?: IconName;
  boundary?: Dimension;
  isDialog?: boolean;
  isStatic?: boolean;
  isActive?: boolean;

  // slots
  slots?: {
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
