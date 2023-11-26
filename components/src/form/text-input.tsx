import type { FocusEvent, KeyboardEvent, PropsWithChildren } from "react";
import { useCallback } from "react";
import { memoize } from "@tntfx/core";
import { useToggle } from "@tntfx/hooks";
import { Icon } from "@tntfx/icons";
import { classNames } from "@tntfx/theme";
import type { BaseInputProps } from "./base-input";
import { BaseInput } from "./base-input";
import type { FormElementProps } from "./form-element";
import { FormElement } from "./form-element";
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
    help,
    placeholder,
    role = "textbox",
    slots = {},
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
      className={classNames("textInput", className, { "--focused": hasFocus, "--pristine": !value })}
      data-testid={`textInput-${name}`}
      disabled={disabled}
      error={error}
      help={help}
      isLoading={isLoading}
      label={label}
      name={name}
      readOnly={readOnly}
      role={role}
    >
      <BaseInput
        className="textInput__control"
        disabled={disabled}
        id={name}
        name={name}
        placeholder={label && !hasFocus ? "" : placeholder}
        readOnly={readOnly}
        value={value || ""}
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        onKeyUp={handleKeyUp}
        {...libProps}
        slots={{
          end: showClearIcon ? <Icon name="cross" onClick={onClear} /> : slots.end,
        }}
      />
      {children}
    </FormElement>
  );
});
