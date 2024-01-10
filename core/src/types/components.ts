import type { AriaRole, CSSProperties, PropsWithChildren } from "react";
import type { Any, MaybePromise } from "./base";
import type { Option } from "./option";

export enum Action {
  Cancel = "Cancel",
  Ok = "Ok",
  Retry = "Retry",
}
export enum ActionSet {
  Ok = "Ok",
  OkCancel = "OkCancel",
  RetryCancel = "RetryCancel",
}
export type Actions<T extends string = string> = ActionSet | `${ActionSet}` | Option<T>[];
export type OnAction<T extends string = string> = (
  action: T extends Action ? Action : T
) => void | MaybePromise<Any<boolean>>;
export type Actionable<T extends string = string> = {
  actions?: Actions<T>;
  onAction?: OnAction<T>;
};

export interface Props {
  className?: string;
  style?: CSSProperties;
  role?: AriaRole;
}
