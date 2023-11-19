import type { CSSProperties, MouseEvent } from "react";
import type { Animation, Boundary, ClassAndChildren, Dimension } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Box } from "./layout/box";
import { memoize } from "./memoize";
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
  boundary?: Boundary | Dimension;
  onClick?: () => void;
};

export const Backdrop = memoize(function Backdrop(props: ClassAndChildren<BackdropProps>) {
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

  let style: CSSProperties = {};
  // if (boundary) {
  //   style = { ...boundary };
  // }

  const backdrop = (
    <Box
      role="presentation"
      style={style}
      className={classNames("backdrop", className, `--animation-${animation}`, `--bg-${background}`, {
        "--noOverlay": !overlay,
        "--visible": isOpen,
        "--global": global,
      })}
      onClick={handleClick}
    >
      <Box className="backdrop__body">{isOpen || persistent ? children : null}</Box>
    </Box>
  );

  return global ? <Portal>{backdrop}</Portal> : backdrop;
});
