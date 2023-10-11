import { useEffect, useRef } from "react";
import type { Dimension, Nullable } from "@tntfx/core";
import { disableEvent, getEventCoords } from "@tntfx/core";

const DRAG_DELAY = 150;

type DragInitialState = {
  dimension: Dimension;
  boundingRect: Dimension;
  pointerPosition: { x: number; y: number };
};

export type UseDragConfig = {
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (dimension: Dimension) => void;
  target?: Nullable<HTMLElement>;
  boundingRect?: Dimension;
};

export function useDrag<T extends HTMLElement = HTMLElement>(element: Nullable<T>, config?: UseDragConfig) {
  const { draggable = true, target, onDragStart, onDragEnd } = config || {};

  const initial = useRef<DragInitialState>({} as DragInitialState);

  useEffect(() => {
    if (!element || !draggable) return;
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
        // e.preventDefault();
        e.stopPropagation();
        isDrag = true;
        if (!element) {
          return;
        }
        const dimension = (target || element).getBoundingClientRect();

        const boundingRect: Dimension = config?.boundingRect || {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
        const [clientX, clientY] = getEventCoords(e);
        initial.current = { dimension, pointerPosition: { x: clientX, y: clientY }, boundingRect };

        element.addEventListener("click", disableEvent);
        target?.addEventListener("click", disableEvent);
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
      const possibleLeft = dimension.left + dx;
      const dy = clientY - pointerPosition.y;
      const possibleTop = dimension.top + dy;

      const top = Math.min(
        Math.max(possibleTop, boundingRect.top),
        boundingRect.top + boundingRect.height - dimension.height
      );

      const left = Math.min(
        Math.max(possibleLeft, boundingRect.left),
        boundingRect.left + boundingRect.width - dimension.width
      );

      if (target) {
        target.style.top = `${top}px`;
        target.style.left = `${left}px`;
      }
    }

    function handleDragEnd() {
      isReleased = true;

      if (!element) return;

      element.removeEventListener("click", disableEvent);
      target?.removeEventListener("click", disableEvent);
      window.removeEventListener("mousemove", handleDragging);
      window.removeEventListener("touchmove", handleDragging);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
      if (isDrag) {
        onDragEnd?.(target ? target.getBoundingClientRect() : element.getBoundingClientRect());
      }
    }

    element.addEventListener("mousedown", handleDragStart);
    element.addEventListener("touchstart", handleDragStart);

    return () => {
      element.removeEventListener("mousedown", handleDragStart);
      element.removeEventListener("touchstart", handleDragStart);
    };
  }, [config?.boundingRect, draggable, element, onDragEnd, onDragStart, target]);
}
