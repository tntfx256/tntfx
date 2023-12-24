import type { Actionable } from "@tntfx/core";
import { Frame } from "../../layout";
import { ActionBar } from "../../layout/bar/action-bar";
import type { FrameProps } from "../../layout/frame/types";

export interface DialogProps extends FrameProps, Actionable {
  open?: boolean;
  global?: boolean;
  onClose?: () => void;
}

export function Dialog(props: DialogProps) {
  const {
    // title,
    children,
    open,
    // className,
    actions,
    // persistent,
    onAction,
    // onClose,
    // global,
    // background,
    // type,
    // draggable = false,
    // resizable = false,
    ...libProps
  } = props;

  // const closeAction = getCloseAction(actions);

  // const handleClose = useCallback(() => {
  //   if (onAction && closeAction) {
  //     onAction(closeAction);
  //   } else {
  //     onClose?.();
  //   }
  // }, [closeAction, onAction, onClose]);

  // const handleOpenChange = useCallback(
  //   (_event: DialogOpenChangeEvent, data: DialogOpenChangeData) => {
  //     if (!data.open) {
  //       onClose?.();
  //     }
  //   },
  //   [onClose]
  // );

  return open ? (
    <Frame
      slots={{
        footer: <ActionBar actions={actions} onAction={onAction} />,
      }}
      {...libProps}
    >
      {children}
    </Frame>
  ) : null;
}
