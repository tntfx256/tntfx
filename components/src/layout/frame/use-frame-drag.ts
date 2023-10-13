import { useEffect, useState } from "react";
import type { Boundary, Nullable } from "@tntfx/core";
import { boundaryToBoundingRect } from "@tntfx/core";
import { useDrag } from "@tntfx/hooks";
import type { SetDimension } from "./types";
import { FrameStatus } from "./types";

interface UseFrameDragConfig {
  // id: string;
  // isDialog?: boolean;
  frameStatus?: FrameStatus;
  draggable: boolean | undefined;
  frameElement: Nullable<HTMLDivElement>;
  boundary?: Boundary;
  setDimension: SetDimension;
}

export function useFrameDrag(config: UseFrameDragConfig) {
  const { frameElement, frameStatus, draggable, boundary, setDimension } = config;

  const [headerElement, setHeaderElement] = useState<Nullable<HTMLDivElement>>(null);

  useDrag(headerElement, {
    boundingRect: boundaryToBoundingRect(boundary || {}),
    target: frameElement,
    draggable: draggable && (!frameStatus || frameStatus === FrameStatus.Normal),
    onDragStart() {
      // onChange({ id, type: "activate", isDialog });
    },
    onDragEnd(dimension) {
      // onChange({ id, type: "drag", dimension, isDialog });
      setDimension(dimension);
    },
  });

  useEffect(() => {
    if (headerElement || !frameElement) {
      return;
    }
    setHeaderElement(frameElement.querySelector<HTMLDivElement>(".frame-header"));
  }, [frameElement, headerElement]);
}
