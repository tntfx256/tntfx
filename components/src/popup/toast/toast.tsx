import { useCallback, useEffect } from "react";
import { useLazyTimer } from "@tntfx/hooks";
import { Alert } from "../../alert";
import type { ToastPayload } from "../types";
import "./toast.scss";

export function Toast(props: ToastPayload) {
  const { title, children, timeout, actions: toastActions, type = "info", onAction, onClose, icon, description } = props;

  const timer = useLazyTimer((timeout || 0) * 1000);

  const handleCloseToast = useCallback(() => {
    timer.stop();
    onClose?.();
  }, [onClose, timer]);

  const handleClick = useCallback(
    async (action: string) => {
      // check weather to prevent closing the dialog
      if (onAction) {
        const result = await onAction(action);
        if (result === false) return;
      }
    },
    [onAction]
  );

  useEffect(() => {
    timer.fn = handleCloseToast;

    if (timeout != undefined) {
      timer.restart();

      return timer.stop;
    }
  }, [handleCloseToast, timeout, timer]);

  return (
    <Alert
      actions={toastActions}
      className="toast"
      icon={icon}
      message={description}
      title={title}
      type={type}
      onAction={handleClick}
    >
      {children}
    </Alert>
  );
}
