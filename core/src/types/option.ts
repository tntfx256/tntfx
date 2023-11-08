import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import type { Any, MaybePromise } from "./base";
import type { Color, Size, Variant } from "./theme";
import { Field } from "../field";
import type { IconName } from "../icon";
import { Model } from "../model";

export type Option<T extends string = string> = {
  id: T;
  title: string;
  avatar?: string;
  children?: Option<T>[];
  disabled?: boolean;
  external?: boolean;
  hidden?: boolean;
  href?: string;
  icon?: IconName;
  iconPosition?: "start" | "end";
  path?: string;
  size?: Size | `${Size}`;
  color?: Color;
  variant?: Variant | `${Variant}`;
};

export class OptionModel extends Model<Option> {
  static get fields() {
    return {
      id: new Field("id", { minLength: 1, required: true, type: "String" }),
      title: new Field("title", {
        minLength: 1,
        required: true,
        type: "String",
      }),
    };
  }

  static convert(values: Readonly<string[]> | string[]): Option[] {
    return values.map((v) => ({ id: v, title: v }));
  }
}

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

export type ClassName<T = {}> = T & { className?: string };
export type WithChildren<T = {}> = PropsWithChildren<T>;
export type ClassAndChildren<T = {}> = PropsWithChildren<ClassName<T>>;

// Next.js
export type WithLayout<T = unknown> = T & {
  getLayout?: (page: ReactElement) => ReactNode;
};
