import type { Dimension } from "@tntfx/core";

export enum FrameStatus {
  Normal = "normal",
  Maximized = "maximized",
}

export type SetDimension = (dimension: Dimension) => void;
