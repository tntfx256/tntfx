import type { Actions, Nullable } from "@tntfx/core";
import { Action } from "@tntfx/core";

export function getCloseAction(actions?: Actions): Nullable<Action> {
  if (actions === "OkCancel" || actions === "RetryCancel") return Action.Cancel;
  if (actions === "Ok") Action.Ok;

  return null;
}
