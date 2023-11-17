import type { ChangeEvent, ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef, useCallback } from "react";
import { classNames } from "@tntfx/theme";
import { memoize } from "../memoize";
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
  onClick?: N["onClick"];
  onFocus?: N["onFocus"];
  onBlur?: N["onBlur"];
  onKeyUp?: N["onKeyUp"];
};

function BaseInputWithRef(props: BaseInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { className, name, onChange, ...libProps } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      onChange?.(text, name || "");
    },
    [onChange, name]
  );

  return (
    <input
      className={classNames("base-input", className, { readonly: props.readOnly, disabled: props.disabled })}
      name={name}
      ref={ref}
      onChange={handleChange}
      onInput={handleChange}
      {...libProps}
    />
  );
}

export const BaseInput = memoize(forwardRef(BaseInputWithRef));
BaseInput.displayName = "BaseInput";
