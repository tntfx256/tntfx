import type { CSSProperties, MouseEvent } from "react";
import { memo } from "react";
import type { Animation, ClassAndChildren, Dimension } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Box } from "./layout/box";
import { Portal } from "./portal";
import "./backdrop.scss";

export type BackdropProps = {
  /** @description when true, the children won't be removed when it's closed */
  persistent?: boolean;
  overlay?: boolean;
  global?: boolean;
  isOpen?: boolean;
  background?: "blur" | "transparent" | "default";
  animation?: Animation;
  wrapper?: HTMLElement;
  boundary?: Dimension;
  onClick?: () => void;
};

export const Backdrop = memo(function Backdrop(props: ClassAndChildren<BackdropProps>) {
  const {
    children,
    className,
    persistent = true,
    background = "default",
    isOpen,
    animation = "zoom",
    overlay = true,
    global,
    onClick,
    boundary,
  } = props;

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  }

  let style: CSSProperties = {};
  if (boundary) {
    style = { ...boundary };
  }

  const backdrop = (
    <Box
      className={classNames("backdrop", className, animation, `bg-${background}`, { overlay, open: isOpen, global })}
      style={style}
      onClick={handleClick}
    >
      {isOpen || persistent ? children : null}
    </Box>
  );

  return global ? <Portal>{backdrop}</Portal> : backdrop;
});
