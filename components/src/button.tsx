import type { ForwardedRef, MouseEvent, ReactElement } from "react";
import { forwardRef, useCallback } from "react";
import { type Accent, type Any, type MaybePromise, memoize, type PropsAndChildren, type Variant } from "@tntfx/core";
import { useToggle } from "@tntfx/hooks";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import { Loader } from "./loader";
import "./button.scss";

export interface ButtonProps extends PropsAndChildren, EnhancedProps {
  title?: string;
  isLoading?: boolean;
  onClick?: (e: MouseEvent) => MaybePromise<Any>;
  disabled?: boolean;
  variant?: Variant | `${Variant}`;
  accent?: Accent | `${Accent}`;
  slots?: {
    start?: ReactElement;
    end?: ReactElement;
  };
}

function ButtonWithRef(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, title, isLoading, onClick, slots = {} } = props;
  const { className, style } = useParseProps(props);

  const [isInnerLoading, showInnerLoader, hideInnerLoader] = useToggle();

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      if (isLoading || isInnerLoading) return;

      try {
        showInnerLoader();
        await onClick?.(e);
      } finally {
        hideInnerLoader();
      }
    },
    [hideInnerLoader, isInnerLoading, isLoading, onClick, showInnerLoader]
  );

  const showLoader = isInnerLoading || isLoading;

  return (
    <button
      className={classNames("button --noUserSelect --hover", className, { "--loading": isLoading })}
      ref={ref}
      style={style}
      onClick={handleClick}
    >
      {slots.start && <span className="button__slot button__slot--start">{slots.start}</span>}
      {title}
      {children}
      {slots.end && <span className="button__slot button__slot--end">{slots.end}</span>}

      <Loader className="button__loader" visible={showLoader} />
    </button>
  );
}

export const Button = memoize(forwardRef(ButtonWithRef));
