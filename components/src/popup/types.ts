import type { AriaRole } from "react";
import type { Actionable, Dimension, MessageType, PropsAndChildren, Second } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import type { BackdropProps } from "../backdrop";

export enum PopupType {
  Dialog = "dialog",
  Toast = "toast",
  // Notification = "Notification"
}

interface CommonPopupProps extends PropsAndChildren, Actionable {
  id: string;
  role?: AriaRole;
  title?: string;
  isOpen?: boolean;
  icon?: IconName;
  type?: MessageType;
  onClose?: () => void;
}

export interface ToastProps extends CommonPopupProps {
  timeout?: Second;
}
export interface ToastPayload extends ToastProps {
  id: string;
  description?: string;
}

export interface DialogProps extends CommonPopupProps {
  global?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  persistent?: boolean;
  isBlocking?: boolean;
  background?: BackdropProps["background"];
  boundary?: Dimension;
}
export interface DialogPayload extends DialogProps {
  id: string;
}
