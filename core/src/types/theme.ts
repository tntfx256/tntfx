import type { CSSProperties } from "react";

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
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Destructive = "destructive",
  Success = "success",
  Warning = "warning",
  Info = "info",
  Error = "error",
}
export const accents = Object.values(Accent) as Accent[];
export type Color = `${Accent}` | CSSProperties["color"];

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
