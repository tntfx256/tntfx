export enum Status {
  Error = "error",
  Idle = "idle",
  Loading = "loading",
  Success = "success",
}
export const statuses = Object.values(Status) as Status[];

export enum Layout {
  Grid = "grid",
  Horizontal = "horizontal",
  Vertical = "vertical",
}
export const layouts = Object.values(Layout) as Layout[];

export enum MessageType {
  Error = "error",
  Info = "info",
  Question = "question",
  Success = "success",
  Warning = "warning",
}
export const messageTypes = Object.values(MessageType) as MessageType[];

export enum Variant {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Destructive = "destructive",
}
export const variants = Object.values(Variant) as Variant[];

export enum Shape {
  Contained = "contained",
  Outlined = "outlined",
  Void = "void",
}
export const shapes = Object.values(Shape) as Shape[];

export enum Size {
  "xxs" = "xxs",
  "xs" = "xs",
  "sm" = "sm",
  "md" = "md",
  "lg" = "lg",
  "xl" = "xl",
  "xxl" = "xxl",
  "xxxl" = "xxxl",
}
export const sizes = Object.values(Size) as Size[];

export type Animation = "slide-right" | "zoom" | "slide-up";
