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

export enum Accent {
  Primary = "primary",
  Secondary = "secondary",
  Outline = "outline",
  Subtle = "subtle",
  Transparent = "transparent",
}
export const accents = Object.values(Accent) as Accent[];

export enum Variant {
  Contained = "contained",
  Outlined = "outlined",
  Void = "void",
}
export const variants = Object.values(Variant) as Variant[];

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

export type Animation = "slideRight" | "zoom" | "slideUp";
