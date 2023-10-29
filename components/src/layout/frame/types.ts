import type { Boundary, Dimension, IconName } from "@tntfx/core";
import { BoxProps } from "../box";
import { ReactNode } from "react";

export enum FrameStatus {
  Normal = "normal",
  Maximized = "maximized",
}

export type SetDimension = (dimension: Dimension) => void;

export interface FrameProps extends Omit<BoxProps, "id"> {
  id: string;
  // isSidebarOpen?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  title?: string;
  icon?: IconName;
  boundary?: Boundary;
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
  onClose?: () => void;
  // headerSlot?: ReactNode;
  // titlebarSlot?: ReactNode;
  // sidebarSlot?: ReactNode;
  // footerSlot?: ReactNode;
  //
  // onChange: (event: FrameEvent) => void;
  // onSidebarToggle?: () => void;
}
