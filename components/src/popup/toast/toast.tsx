import { useCallback, useEffect } from "react";
import { Alert } from "../../alert";
import { useTimeout } from "../../hooks";
import type { ToastPayload } from "../types";

export function Toast(props: ToastPayload) {
  const { title, children, timeout, actions: toastActions, onAction, onClose, icon, description } = props;

  const timer = useTimeout((timeout || 0) * 1000);

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
    if (timeout != undefined) {
      timer.start(handleCloseToast);

      return timer.stop;
    }
  }, [handleCloseToast, timeout, timer]);

  return (
    <Alert actions={toastActions} className="toast" icon={icon} message={description} title={title} onAction={handleClick}>
      {children}
    </Alert>
  );
}
