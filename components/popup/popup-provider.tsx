import type { PropsWithChildren } from "react";
import { AppManager } from "./app-frame/app-manager";
import { DialogProvider } from "./dialog/dialog-context";
import { ToastProvider } from "./toast/toast-context";

export function PopupProvider(props: PropsWithChildren) {
  return (
    <ToastProvider>
      <DialogProvider>
        <AppManager>{props.children}</AppManager>
      </DialogProvider>
    </ToastProvider>
  );
}
