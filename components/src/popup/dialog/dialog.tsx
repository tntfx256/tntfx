import { useCallback } from "react";
import { classNames } from "@tntfx/theme";
import { Backdrop } from "../../backdrop";
import { ActionBar } from "../../layout/bar/action-bar";
import { Frame } from "../../layout/frame";
import { getCloseAction } from "../../utils";
import type { DialogProps } from "../types";
import "./dialog.scss";

export function Dialog(props: DialogProps) {
  const {
    isOpen,
    className,
    actions,
    persistent,
    onAction,
    onClose,
    global,
    background = "default",
    // type,
    draggable = false,
    resizable = false,
    ...frameProps
  } = props;

  const closeAction = getCloseAction(actions);

  const handleClose = useCallback(() => {
    if (onAction && closeAction) {
      onAction(closeAction);
    } else {
      onClose?.();
    }
  }, [closeAction, onAction, onClose]);

  return isOpen ? (
    <Backdrop
      animation="zoom"
      background={background}
      className={classNames("dialog-backdrop", { [`${className}-dialog-backdrop`]: className })}
      global={global ?? !frameProps.boundary}
      isOpen={isOpen}
      persistent={persistent}
      boundary={frameProps.boundary}
    >
      <Frame
        isDialog
        className={classNames("dialog", className)}
        slots={{
          footer: actions || onAction ? <ActionBar actions={actions} onAction={onAction} /> : undefined,
        }}
        onClose={handleClose}
        draggable={draggable}
        resizable={resizable}
        {...frameProps}
      />
    </Backdrop>
  ) : null;
}
