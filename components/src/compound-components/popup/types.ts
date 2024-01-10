import type { AriaRole } from "react";
import type { MessageType, Second } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";

export enum PopupType {
  Dialog = "dialog",
  Toast = "toast",
  // Notification = "Notification"
}

export interface ToastProps {
  id: string;
  role?: AriaRole;
  title?: string;
  isOpen?: boolean;
  icon?: IconName;
  type?: MessageType;
  onClose?: () => void;
  timeout?: Second;
}
export interface ToastPayload extends ToastProps {
  id: string;
  description?: string;
}
