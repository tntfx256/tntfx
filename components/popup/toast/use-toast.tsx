import { useId } from "react";
import type { Nullable, SerializableError } from "@tntfx/core";
import { useStore } from "./toast-context";
import type { ToastPayload } from "../types";

export function useToast() {
  const id = useId();
  const [{ toasts }, setState] = useStore();

  function hide() {
    setState({ toasts: toasts.filter((t) => t.id !== id) });
  }

  function show(payload: Nullable<Omit<ToastPayload, "id">>, error?: SerializableError) {
    const toast: ToastPayload = {
      ...payload,
      id,
      isOpen: true,
      timeout: payload?.timeout || (payload?.actions ? undefined : 5),
      onClose: payload?.onClose || hide,
      title: payload?.title || (error ? error.name : "An error ocurred"),
      children: payload?.children || (error ? error.message : ""),
      type: payload?.type || (error ? "error" : "info"),
    };
    setState({ toasts: [...toasts, toast] });
  }

  return { show, hide, isOpen: toasts.some((t) => t.id === id) };
}
