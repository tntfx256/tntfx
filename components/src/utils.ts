import type { ForwardedRef } from "react";
import type { Actions, Nullable } from "@tntfx/core";
import { Action } from "@tntfx/core";

export function getCloseAction(actions?: Actions): Nullable<Action> {
  if (actions === "OkCancel" || actions === "RetryCancel") return Action.Cancel;
  if (actions === "Ok") Action.Ok;

  return null;
}

export function isRefValid<T>(ref?: ForwardedRef<T>) {
  return ref && (typeof ref === "function" || ref.current);
}

export function interceptRef<T>(ref?: ForwardedRef<T>) {
  if (process.env.NODE_ENV === "production") {
    return isRefValid(ref) ? ref : undefined;
  }
  if (isRefValid(ref)) {
    return ref;
  }
  // invalid ref passed to component
  if (ref) {
    console.warn("Invalid ref passed to component. It will be ignored.");
  }
}
