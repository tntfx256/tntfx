import type { SerializableError } from "../error";
import type { Model } from "../model";

export type MaybePromise<T> = Promise<T> | T;
export type MightThrow<T> = T | never;
export type MightReject<T> = Promise<T | never>;
export type Enumerable<T> = T | T[];
export type Nullable<T> = T | null;

export type Second = number;

export type Index = string | number | symbol;
export type Keys<T> = keyof T;
export type StringKeys<T, K extends Keys<T> = Keys<T>> = K extends string ? K : never;
export type Type<T, K extends Keys<T>> = T[K] extends (infer R)[] ? R : T[K];
export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
export type DeepPartial<T> = T extends object ? { [P in Keys<T>]?: DeepPartial<T[P]> } : T;
export type DeepRequired<T> = Required<{ [K in Keys<T>]: Required<DeepRequired<T[K]>> }>;

export type Any<T = any> = T | null | undefined | void;
export type TIMESTAMP = number;
export type ENUM<T = string> = T[];
export type LIST<T = string> = T[];
export type OBJECT<T = Any, I extends Index = string> = Record<I, T>;

export type Types = {
  BOOLEAN: boolean;
  ENUM: ENUM;
  LIST: LIST;
  NUMBER: number;
  OBJECT: Model;
  STRING: string;
  TIMESTAMP: TIMESTAMP;
};

export type ERROR = Error | SerializableError | string | unknown;

export type Status = "Error" | "Idle" | "Loading" | "Success";

export type Layout = "grid" | "horizontal" | "vertical";
export type MessageType = "error" | "info" | "question" | "success" | "warning";
export type Variant = "default" | "primary" | "secondary" | "destructive";
export type Shape = "contained" | "outlined" | "void";
export type Size = "xxSmall" | "xSmall" | "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
export type Sizable<T = number, S extends string = Size> = Record<S, T>;

export type Animation = "slide-right" | "zoom" | "slide-up";
