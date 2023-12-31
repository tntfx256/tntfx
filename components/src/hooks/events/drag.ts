import { useEffect, useRef } from "react";
import type { BoundingRect, Dimension, Nullable } from "@tntfx/core";
import { disableEvent, getEventCoords, isInBoundary, toBoundingRect } from "@tntfx/core";

const MIN_DIFF = 1;
const DRAG_DELAY = 150;
const BOUNDING_OFFSET = 16;

type DragInitialState = {
  dimension: BoundingRect;
  boundingRect: BoundingRect;
  pointerPosition: { x: number; y: number };
  lastPosition: { top: number; left: number };
};

type DragDimension = { top: number; left: number; dx: number; dy: number };
export type UseDragConfig = {
  draggable?: boolean;
  onDragStart?: () => void;
  onDragging?: (dimension: DragDimension) => void;
  onDragEnd?: (dimension: DragDimension) => void;
  boundingRect?: Dimension;
};

export function useDrag<T extends HTMLElement = HTMLElement>(element: Nullable<T>, config?: UseDragConfig) {
  const { draggable = true, onDragStart, onDragging, onDragEnd } = config || {};

  const initial = useRef<DragInitialState>({} as DragInitialState);

  useEffect(() => {
    if (!element || !draggable) {
      return;
    }

    if (!initial.current.dimension) {
      const dimension = element.getBoundingClientRect();
      initial.current.dimension = dimension;
      initial.current.boundingRect = toBoundingRect(config?.boundingRect || {});
      initial.current.lastPosition = { left: dimension.left, top: dimension.top };

      // console.log("initial", { left: dimension.left, top: dimension.top });
    }

    let isReleased = true;
    let isDrag = false;

    function handleDragStart(e: MouseEvent | TouchEvent) {
      if (!element) {
        return;
      }

      isReleased = false;
      isDrag = false;
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);

      setTimeout(() => {
        if (isReleased) {
          return;
        }

        e.stopPropagation();
        isDrag = true;

        if (!element) {
          return;
        }

        const [clientX, clientY] = getEventCoords(e);
        initial.current.pointerPosition = { x: clientX, y: clientY };

        element.addEventListener("click", disableEvent);
        window.addEventListener("mousemove", handleDragging);
        window.addEventListener("touchmove", handleDragging);

        onDragStart?.();
      }, DRAG_DELAY);
    }

    function handleDragging(e: MouseEvent | TouchEvent) {
      // e.preventDefault();
      e.stopPropagation();
      if (!element) return;

      const [clientX, clientY] = getEventCoords(e);

      const { pointerPosition, boundingRect, dimension } = initial.current;
      const dx = clientX - pointerPosition.x;
      const left = dimension.left + dx;
      const dy = clientY - pointerPosition.y;
      const top = dimension.top + dy;

      initial.current.lastPosition = { left, top };
      if (isInBoundary(boundingRect, clientX, clientY, BOUNDING_OFFSET)) {
        onDragging?.({ top, left, dx, dy });
      }
    }

    function handleDragEnd() {
      isReleased = true;

      if (!element) return;

      element.removeEventListener("click", disableEvent);
      window.removeEventListener("mousemove", handleDragging);
      window.removeEventListener("touchmove", handleDragging);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
      if (isDrag) {
        const { lastPosition, dimension } = initial.current;
        const dx = Math.abs(lastPosition.left - dimension.left);
        const dy = Math.abs(lastPosition.top - dimension.top);
        if (dx > MIN_DIFF || dy > MIN_DIFF) {
          onDragEnd?.({ ...lastPosition, dx, dy });
        }
      }

      initial.current = {} as DragInitialState;
    }

    element.addEventListener("mousedown", handleDragStart);
    element.addEventListener("touchstart", handleDragStart);

    return () => {
      element.removeEventListener("mousedown", handleDragStart);
      element.removeEventListener("touchstart", handleDragStart);
    };
  }, [config?.boundingRect, draggable, element, onDragEnd, onDragStart, onDragging]);
}
