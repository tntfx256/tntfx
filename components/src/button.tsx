import type { ForwardedRef, MouseEvent } from "react";
import { forwardRef, useCallback } from "react";
import type { ButtonProps as LibButtonProps } from "@fluentui/react-components";
import { Button as LibButton } from "@fluentui/react-components";
import type { Any } from "@tntfx/core";
import { memoize } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./button.style";
import { useToggle } from "./hooks";
import { Loader } from "./loader";

export type ButtonProps = LibButtonProps & {
  isLoading?: boolean;
  enableLoading?: boolean;
};

function ButtonWithRef(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>) {
  const { children, isLoading, enableLoading, className, onClick, ...libProps } = props;

  const classes = useStyle();
  const [isInnerLoading, showInnerLoader, hideInnerLoader] = useToggle();

  const handleClick = useCallback(
    async (e: MouseEvent<Any>) => {
      if (isLoading || isInnerLoading) return;

      if (!enableLoading) {
        onClick?.(e);
        return;
      }

      try {
        showInnerLoader();
        await onClick?.(e);
      } finally {
        hideInnerLoader();
      }
    },
    [enableLoading, hideInnerLoader, isInnerLoading, isLoading, onClick, showInnerLoader]
  );

  const showLoader = isInnerLoading || isLoading;

  return (
    <LibButton className={classNames(classes.root, className)} ref={ref} onClick={handleClick} {...libProps}>
      {children}

      <Loader visible={showLoader} />
    </LibButton>
  );
}

export const Button = memoize(forwardRef(ButtonWithRef));
