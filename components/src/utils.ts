import type { Action, Actions, Nullable } from "@tntfx/core";

export function getCloseAction(actions?: Actions): Nullable<Action> {
  if (actions === "OkCancel" || actions === "RetryCancel") return "Cancel";
  if (actions === "Ok") return "Ok";

  return null;
}
