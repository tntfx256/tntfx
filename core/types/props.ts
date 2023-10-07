import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import type { Any, MaybePromise } from "./base";
import type { Option } from "./option";

export type Action = "Cancel" | "Ok" | "Retry";
export type ActionSet = "Ok" | "OkCancel" | "RetryCancel";
export type Actions<T extends string = string> = ActionSet | Option<T>[];
export type OnAction<T extends string = string> = (action: T extends Action ? Action : T) => MaybePromise<Any<boolean>>;
export type Actionable<T extends string = string> = { actions?: Actions<T>; onAction?: OnAction<T> };

export type ClassName<T = {}> = T & { className?: string };
export type ClassAndChildren<T = {}> = PropsWithChildren<ClassName<T>>;

// Next.js
export type WithLayout<T = unknown> = T & { getLayout?: (page: ReactElement) => ReactNode };
