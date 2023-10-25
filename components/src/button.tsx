import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { Any, ClassAndChildren, IconName, MaybePromise, Shape, Variant } from "@tntfx/core";
import { useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { Loader } from "./loader";
import { Svg } from "./svg";
import "./button.scss";

export interface ButtonProps {
  title?: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  shape?: Shape;
  onClick?: () => MaybePromise<Any>;
  startIcon?: IconName;
  endIcon?: IconName;
}

export function Button(props: ClassAndChildren<ButtonProps>) {
  const { children, title, className, isLoading, onClick, disabled, shape, variant, startIcon, endIcon } = props;

  const [isInnerLoading, showInnerLoader, hideInnerLoader] = useToggle();

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled || isLoading) return;

      try {
        showInnerLoader();
        await onClick?.();
      } finally {
        hideInnerLoader();
      }
    },
    [disabled, hideInnerLoader, isLoading, onClick, showInnerLoader],
  );

  const showLoader = isInnerLoading || isLoading;

  return (
    <button
      className={classNames("button", className, `variant-${variant}`, `shape-${shape}`, { loading: isLoading })}
      disabled={disabled}
      onClick={handleClick}
    >
      {startIcon && <Svg name={startIcon} />}
      {title}
      {children}
      {endIcon && <Svg name={endIcon} />}

      <Loader visible={showLoader} />
    </button>
  );
}
