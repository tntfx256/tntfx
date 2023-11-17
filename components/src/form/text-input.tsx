import type { FocusEvent, KeyboardEvent, PropsWithChildren } from "react";
import { useCallback } from "react";
import { useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import type { BaseInputProps } from "./base-input";
import { BaseInput } from "./base-input";
import type { FormElementProps } from "./form-element";
import { FormElement } from "./form-element";
import { Icon } from "../icon";
import { memoize } from "../memoize";
import "./text-input.scss";

export type TextInputProps = FormElementProps &
  BaseInputProps & {
    onEnter?: () => void;
    onClear?: () => void;
  };

export const TextInput = memoize(function TextInput(props: PropsWithChildren<TextInputProps>) {
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
    onClear,
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
    [onEnter, onKeyUp]
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement, HTMLInputElement>) => {
      getFocused();
      onFocus?.(e);
    },
    [getFocused, onFocus]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement, HTMLInputElement>) => {
      lostFocused();
      onBlur?.(e);
    },
    [lostFocused, onBlur]
  );

  const showClearIcon = !readOnly && !disabled && value && !isLoading && onClear;

  return (
    <FormElement
      className={classNames("textInput", className, { focused: hasFocus, pristine: !value })}
      disabled={disabled}
      error={error}
      isLoading={isLoading}
      label={label}
      name={name}
      readOnly={readOnly}
    >
      <BaseInput
        className="textInput__control"
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
      {showClearIcon && <Icon className="textInput__clearIcon" name="cross" onClick={onClear} />}
    </FormElement>
  );
});
