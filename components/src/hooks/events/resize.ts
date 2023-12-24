import { useEffect, useRef, useState } from "react";
import type { Any, BoundingRect, Dimension, Nullable } from "@tntfx/core";
import { getEventCoords, getMinMaxDimension, toBoundingRect } from "@tntfx/core";

const resizeKeys = ["top", "right", "bottom", "left", "top-left", "top-right", "bottom-left", "bottom-right"] as const;
type ResizeKeys = (typeof resizeKeys)[number];

type ResizeInitialState = {
  type: ResizeKeys;
  dimension: BoundingRect;
  boundingRect: BoundingRect;
  pointerPosition: { x: number; y: number };
};

export type UseResizeConfig = {
  resizable?: boolean;
  boundingRect?: Dimension;
  onResizeStart?: () => void;
  onResizeEnd?: (dimension: Dimension) => void;
};

export function useResize<T extends HTMLElement = HTMLElement>(element: Nullable<T>, config?: UseResizeConfig) {
  const { resizable = true, onResizeStart, onResizeEnd } = config || {};

  const initial = useRef<ResizeInitialState>({} as ResizeInitialState);
  const areResizeHandlesAdded = useRef<boolean>(false);

  const [resizeHandles, setResizeHandles] = useState<HTMLDivElement[]>([]);

  useEffect(() => {
    setResizeHandles(
      resizeKeys.map((key) => {
        const resizer = document.createElement("div");
        resizer.className = `resize resize-${key}`;
        resizer.setAttribute("data-t", key);
        return resizer;
      })
    );
  }, []);

  useEffect(() => {
    if (!element || !resizable || !resizeHandles.length) return;

    function handleDragStart(e: MouseEvent | TouchEvent) {
      if (!element) {
        return;
      }

      const { target } = e;
      const [clientX, clientY] = getEventCoords(e);

      const type = (target as Any).getAttribute("data-t");
      if (!resizeKeys.includes(type)) return;

      initial.current = {
        type,
        dimension: element.getBoundingClientRect(),
        boundingRect: toBoundingRect(toBoundingRect(config?.boundingRect)),
        pointerPosition: { x: clientX, y: clientY },
      };

      onResizeStart?.();

      window.addEventListener("mousemove", handleDragging);
      window.addEventListener("touchmove", handleDragging);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    }

    function handleDragging(e: MouseEvent | TouchEvent) {
      const [clientX, clientY] = getEventCoords(e);
      const newFrame = getResizedDimension(initial.current, clientX, clientY);

      if (element) {
        if ("top" in newFrame) element.style.top = `${newFrame.top}px`;
        if ("left" in newFrame) element.style.left = `${newFrame.left}px`;
        if ("width" in newFrame) element.style.width = `${newFrame.width}px`;
        if ("height" in newFrame) element.style.height = `${newFrame.height}px`;
      }
    }

    function handleDragEnd() {
      window.removeEventListener("mousemove", handleDragging);
      window.removeEventListener("touchmove", handleDragging);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);

      if (onResizeEnd && element) {
        onResizeEnd(element.getBoundingClientRect());
      }
    }

    if (!areResizeHandlesAdded.current) {
      resizeHandles.forEach((handle) => {
        element.appendChild(handle);
      });
      areResizeHandlesAdded.current = true;
    }

    element.addEventListener("mousedown", handleDragStart);
    element.addEventListener("touchstart", handleDragStart);

    return () => {
      element.removeEventListener("mousedown", handleDragStart);
      element.removeEventListener("touchstart", handleDragStart);
    };
  }, [config?.boundingRect, element, onResizeEnd, onResizeStart, resizable, resizeHandles]);
}

function getResizedDimension(initial: ResizeInitialState, x2: number, y2: number): Partial<Dimension> {
  const { pointerPosition, type, boundingRect, dimension } = initial;
  const dx = x2 - pointerPosition.x;
  const dy = y2 - pointerPosition.y;

  const { minWidth, minHeight } = getMinMaxDimension();
  const { top, right, bottom, left } = toBoundingRect(boundingRect);

  const result: Partial<Dimension> = {};

  switch (type) {
    case "top-left":
      checkSide("top");
      checkSide("left");
      break;
    case "top-right":
      checkSide("top");
      checkSide("right");
      break;
    case "bottom-right":
      checkSide("bottom");
      checkSide("right");
      break;
    case "bottom-left":
      checkSide("bottom");
      checkSide("left");
      break;
    default:
      checkSide(type);
  }

  function checkSide(type: ResizeInitialState["type"]) {
    switch (type) {
      case "top":
        if (dimension.top + dy > top && dimension.height - dy >= minHeight) {
          result.top = dimension.top + dy;
          result.height = dimension.height - dy;
        }
        break;
      case "right":
        if (dimension.right + dx < right && dimension.width + dx >= minWidth) {
          result.width = dimension.width + dx;
        }
        break;
      case "bottom":
        if (dimension.bottom + dy < bottom && dimension.height + dy >= minHeight) {
          result.height = dimension.height + dy;
        }
        break;
      case "left":
        if (dimension.left + dx > left && dimension.width - dx >= minWidth) {
          result.left = dimension.left + dx;
          result.width = dimension.width - dx;
        }
        break;
    }
  }

  return result;
}
