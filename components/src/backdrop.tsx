import type { CSSProperties, MouseEvent } from "react";
import { type Animation, type Boundary, type Dimension, memoize, type PropsAndChildren } from "@tntfx/core";
import { Box } from "./layout/box";
import { Portal } from "./portal";

export interface BackdropProps extends PropsAndChildren {
  /** when true, the children won't be removed when it's closed */
  persistent?: boolean;
  overlay?: boolean;
  global?: boolean;
  isOpen?: boolean;
  background?: "blur" | "transparent" | "default";
  animation?: Animation;
  boundary?: Boundary | Dimension;
  style?: CSSProperties;
  onClick?: () => void;
}

export const Backdrop = memoize(function Backdrop(props: BackdropProps) {
  const {
    children,
    className,
    persistent = true,
    background = "transparent",
    isOpen,
    animation = "zoom",
    overlay = true,
    global,
    onClick,
    // boundary,
  } = props;

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  }

  const backdrop = (
    <Box role="presentation" onClick={handleClick}>
      <Box className="backdrop__body">{isOpen || persistent ? children : null}</Box>
    </Box>
  );

  return global ? <Portal>{backdrop}</Portal> : backdrop;
});
