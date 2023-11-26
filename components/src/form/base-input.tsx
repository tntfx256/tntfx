import type { ChangeEvent, ForwardedRef, InputHTMLAttributes, MouseEvent, ReactElement } from "react";
import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { memoize } from "@tntfx/core";
import { useRefState } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { Box } from "../layout";
import "./base-input.scss";

type N = InputHTMLAttributes<HTMLInputElement>;

export type BaseInputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  type?: N["type"];
  value?: string | number;
  onChange?: (value: string, name: string) => void;
  onClick?: (e: MouseEvent) => void;
  onFocus?: N["onFocus"];
  onBlur?: N["onBlur"];
  onKeyUp?: N["onKeyUp"];

  slots?: {
    // start slot cause a problem with the label
    // start?: ReactElement;
    end?: ReactElement;
  };
};

function BaseInputWithRef(props: BaseInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { className, name, onChange, slots = {}, onClick, ...libProps } = props;

  const [input, inputRefHandler] = useRefState<HTMLInputElement>();

  useImperativeHandle(ref, () => input!, [input]);

  const endSlotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (endSlotRef.current && input) {
      const width = endSlotRef.current.clientWidth;
      input.style.paddingRight = `${width + 2}px`;
    }
  }, [input]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      onChange?.(text, name || "");
    },
    [onChange, name]
  );

  return (
    <Box horizontal className="baseInput" onClick={onClick}>
      <input
        className={classNames("baseInput__control", className, { readonly: props.readOnly, disabled: props.disabled })}
        name={name}
        ref={inputRefHandler}
        onChange={handleChange}
        onInput={handleChange}
        {...libProps}
      />
      {slots.end && (
        <span className="baseInput__end" ref={endSlotRef}>
          {slots.end}
        </span>
      )}
    </Box>
  );
}

export const BaseInput = memoize(forwardRef(BaseInputWithRef));
BaseInput.displayName = "BaseInput";
