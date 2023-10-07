import type { Boundary, Dimension } from "@tntfx/core";

type FrameEventWithData = "init" | "resize" | "drag";
type FrameEventWithoutData = "activate" | "maximize" | "minimize" | "restore" | "close";

export type FrameEventType = FrameEventWithData | FrameEventWithoutData;

type Base = {
  id: string;
  isDialog?: boolean;
  parentBoundary?: Boundary;
};
type FrameEventWithoutDataPayload = Base & { type: FrameEventWithoutData };
type FrameEventWithDataPayload = Base & { type: FrameEventWithData; dimension: Dimension };

export type FrameEvent = FrameEventWithDataPayload | FrameEventWithoutDataPayload;

export type FrameEventHandler = (event: FrameEvent) => void;
