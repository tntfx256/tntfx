import { useId } from "react";
import { Action, ActionSet, MessageType, type Nullable, type TError } from "@tntfx/core";
import { useStore } from "./dialog-context";
import { Box } from "../../layout";
import { ErrorContent } from "../../layout/error-content";
import type { DialogPayload } from "../types";

type ConfirmPayload = Pick<DialogPayload, "title" | "children" | "boundary">;

export function useDialog() {
  const id = useId();
  const [{ dialogs }, setState] = useStore();

  function close() {
    setState({ dialogs: dialogs.filter((d) => d.id !== id) });
  }

  function showMessageBox(payload: Nullable<Omit<DialogPayload, "id">>, error?: TError) {
    let onClose: DialogPayload["onClose"] = close;
    if (payload) {
      if (payload.onClose) {
        onClose = payload.onClose;
      } else if (payload.onAction) {
        onClose = undefined;
      }
    }

    const newDialog: DialogPayload = {
      ...payload,
      id,
      onClose,
      isOpen: true,
      draggable: true,
      role: "alertdialog",
      children: <Box>{payload?.children || <ErrorContent error={error} />}</Box>,
      title: payload?.title || (error ? "An error ocurred" : ""),
      type: payload?.type || (error ? MessageType.Error : MessageType.Info),
    };

    setState({ dialogs: [...dialogs, newDialog] });
  }

  function showConfirm(payload: ConfirmPayload) {
    return new Promise<boolean>((resolve) => {
      showMessageBox({
        ...payload,
        resizable: false,
        type: MessageType.Question,
        actions: ActionSet.OkCancel,
        role: "alert",
        onAction(action) {
          resolve(action === Action.Ok);
          close();
        },
      });
    });
  }

  return { open: showMessageBox, confirm: showConfirm, close, isOpen: dialogs.some((d) => d.id === id) };
}
