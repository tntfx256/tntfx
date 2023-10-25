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
    global = true,
    background = "default",
    // type,
    // boundary,
    ...frameProps
  } = props;

  // const [container] = useState(() => {
  //   // const id = generateId();

  //   const container: Container = {
  //     id,
  //     dimension: calcInitialFrameDimension([]),
  //     entity: { id, icon: "apps", name: "dialog", path: "/", type: "App" },
  //     state: "active",
  //     status: "normal",
  //   };

  //   return container;
  // });
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
      global={global}
      isOpen={isOpen}
      persistent={persistent}
    >
      <Frame
        className={classNames("dialog", className)}
        slots={{
          footer: actions || onAction ? <ActionBar actions={actions} onAction={onAction} /> : undefined,
        }}
        {...frameProps}
        isDialog
        // onChange={handleChange}
        onClose={handleClose}
      />
    </Backdrop>
  ) : null;
}
