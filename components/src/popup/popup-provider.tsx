import type { PropsWithChildren } from "react";
import { DialogProvider } from "./dialog/dialog-context";
import { ToastProvider } from "./toast/toast-context";

export function PopupProvider(props: PropsWithChildren) {
  return (
    <ToastProvider>
      <DialogProvider>{props.children}</DialogProvider>
    </ToastProvider>
  );
}
