import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { Any, IconName, MaybePromise, WithChildren } from "@tntfx/core";
import { useToggle } from "@tntfx/hooks";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import { Loader } from "./loader";
import { Svg } from "./svg";
import "./button.scss";

export interface ButtonProps extends WithChildren, EnhancedProps {
  title?: string;
  isLoading?: boolean;
  onClick?: () => MaybePromise<Any>;
  startIcon?: IconName;
  endIcon?: IconName;
}

export function Button(props: ButtonProps) {
  const [className, { children, title, isLoading, onClick, disabled, startIcon, endIcon, ...rest }] = parseProps(props);

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
    [disabled, hideInnerLoader, isLoading, onClick, showInnerLoader]
  );

  const showLoader = isInnerLoading || isLoading;

  return (
    <button
      className={classNames("button --noUserSelect --hover", className, { loading: isLoading })}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {startIcon && <Svg name={startIcon} />}
      {title}
      {children}
      {endIcon && <Svg name={endIcon} />}

      <Loader visible={showLoader} />
    </button>
  );
}
