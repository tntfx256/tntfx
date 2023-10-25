import { useId } from "react";
import type { Nullable, TError } from "@tntfx/core";
import { useStore } from "./dialog-context";
import { ErrorContent } from "../../layout/error-content";
import type { DialogPayload } from "../types";

type ConfirmPayload = Pick<DialogPayload, "title" | "children">;

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
      children: payload?.children || <ErrorContent error={error} />,
      title: payload?.title || (error ? "An error ocurred" : ""),
      type: payload?.type || (error ? "error" : "info"),
    };

    setState({ dialogs: [...dialogs, newDialog] });
  }

  function showConfirm(payload: ConfirmPayload) {
    return new Promise<boolean>((resolve) => {
      showMessageBox({
        ...payload,
        type: "question",
        actions: "OkCancel",
        onAction(action) {
          resolve(action === "Ok");
          close();
        },
      });
    });
  }

  return { open: showMessageBox, confirm: showConfirm, close, isOpen: dialogs.some((d) => d.id === id) };
}
