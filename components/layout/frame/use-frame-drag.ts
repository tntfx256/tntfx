import { useEffect, useState } from "react";
import type { Boundary, FrameStatus, Nullable } from "@tntfx/core";
import { boundaryToBoundingRect } from "@tntfx/core";
import { useDrag } from "@tntfx/hooks";
import type { FrameEventHandler } from "./utils";

interface UseFrameDragConfig {
  id: string;
  isDialog?: boolean;
  status?: FrameStatus;
  draggable: boolean | undefined;
  frameElement: Nullable<HTMLDivElement>;
  boundary?: Boundary;
  onChange: FrameEventHandler;
}

export function useFrameDrag(config: UseFrameDragConfig) {
  const { id, isDialog, frameElement, status, draggable, boundary, onChange } = config;

  const [headerElement, setHeaderElement] = useState<Nullable<HTMLDivElement>>(null);

  useDrag(headerElement, {
    boundingRect: boundaryToBoundingRect(boundary || {}),
    target: frameElement,
    draggable: draggable && (!status || status === "normal"),
    onDragStart() {
      onChange({ id, type: "activate", isDialog });
    },
    onDragEnd(dimension) {
      onChange({ id, type: "drag", dimension, isDialog });
    },
  });

  useEffect(() => {
    if (headerElement || !frameElement) {
      return;
    }
    setHeaderElement(frameElement.querySelector<HTMLDivElement>(".frame-header"));
  }, [frameElement, headerElement]);
}
