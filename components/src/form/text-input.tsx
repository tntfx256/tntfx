import type { FocusEvent, KeyboardEvent, PropsWithChildren } from "react";
import { useCallback } from "react";
import { useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import type { BaseInputProps } from "./base-input";
import { BaseInput } from "./base-input";
import type { FormElementProps } from "./form-element";
import { FormElement } from "./form-element";
import "./text-input.scss";

export type TextInputProps = FormElementProps &
  BaseInputProps & {
    onEnter?: () => void;
  };

export function TextInput(props: PropsWithChildren<TextInputProps>) {
  const {
    className,
    onChange,
    onEnter,
    onKeyUp,
    error,
    name,
    label,
    readOnly,
    disabled,
    onFocus,
    onBlur,
    value,
    children,
    isLoading,
    ...libProps
  } = props;

  const [hasFocus, getFocused, lostFocused] = useToggle();

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onEnter?.();
      }
      onKeyUp?.(e);
    },
    [onEnter, onKeyUp],
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement, HTMLInputElement>) => {
      getFocused();
      onFocus?.(e);
    },
    [getFocused, onFocus],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement, HTMLInputElement>) => {
      lostFocused();
      onBlur?.(e);
    },
    [lostFocused, onBlur],
  );

  return (
    <FormElement
      className={classNames("text-input", className, { focused: hasFocus, pristine: !value })}
      disabled={disabled}
      error={error}
      isLoading={isLoading}
      label={label}
      name={name}
      readOnly={readOnly}
    >
      <BaseInput
        className="control"
        disabled={disabled}
        id={name}
        name={name}
        readOnly={readOnly}
        value={value || ""}
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        onKeyUp={handleKeyUp}
        {...libProps}
      />
      {children}
    </FormElement>
  );
}
