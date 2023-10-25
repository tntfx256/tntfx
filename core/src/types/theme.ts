export type Status = "Error" | "Idle" | "Loading" | "Success";

export type Layout = "grid" | "horizontal" | "vertical";
export type MessageType = "error" | "info" | "question" | "success" | "warning";
export type Variant = "default" | "primary" | "secondary" | "destructive";
export type Shape = "contained" | "outlined" | "void";
export type Size = "xxSmall" | "xSmall" | "small" | "medium" | "large" | "xLarge" | "xxLarge" | "xxxLarge";
export type Sizable<T = number, S extends string = Size> = Record<S, T>;

export type Animation = "slide-right" | "zoom" | "slide-up";
