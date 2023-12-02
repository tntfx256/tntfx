import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";

function isReactTouchEvent(event: MouseEvent | ReactMouseEvent | ReactTouchEvent | TouchEvent): event is ReactTouchEvent {
  return "touches" in event;
}

function isNativeTouchEvent(event: MouseEvent | ReactMouseEvent | ReactTouchEvent | TouchEvent): event is TouchEvent {
  return "touches" in event;
}

function isReactMouseEvent(event: MouseEvent | ReactMouseEvent | ReactTouchEvent | TouchEvent): event is ReactMouseEvent {
  return "clientX" in event;
}

// function isNativeMouseEvent(event: ReactMouseEvent | ReactTouchEvent | MouseEvent | TouchEvent): event is MouseEvent {
//   return "clientX" in event;
// }

export function getEventCoords(ev: MouseEvent | ReactMouseEvent | ReactTouchEvent | TouchEvent): [x: number, y: number] {
  if (isReactTouchEvent(ev)) {
    return [ev.touches[0].clientX, ev.touches[0].clientY];
  }
  if (isNativeTouchEvent(ev)) {
    return [ev.touches[0].clientX, ev.touches[0].clientY];
  }
  if (isReactMouseEvent(ev)) {
    return [ev.clientX, ev.clientY];
  }

  return [ev.clientX, ev.clientY];
}

export function disableEvent(event: Event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

export enum KeyCode {
  Backspace = 8,
  Enter = 13,
  Escape = 27,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40,
}
