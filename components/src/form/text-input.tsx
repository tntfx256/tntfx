import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import type { FieldProps, InputOnChangeData, InputProps } from "@fluentui/react-components";
import { Field, Input } from "@fluentui/react-components";
import { memoize } from "@tntfx/core";

export type TextInputProps = Partial<
  Omit<FieldProps, "onChange"> & Omit<InputProps, "onChange"> & { onChange: (value: string, name?: string) => void }
>;

const TextInputWithRef = (props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    // className,
    onChange,
    // onEnter,
    // onKeyUp,
    // error,
    name,
    label,
    readOnly,
    disabled,
    // onFocus,
    // onBlur,
    value,
    // children,
    // isLoading,
    // onClear,
    // help,
    // placeholder,
    role = "textbox",
    // slots = {},
    ...libProps
  } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      onChange?.(data.value, name);
    },
    [name, onChange]
  );

  return (
    <Field
      data-testid={`textInput-${name}`}
      // error={error}
      // help={help}
      // isLoading={isLoading}
      label={label}
      // name={name}
      // readOnly={readOnly}
      role={role}
    >
      <Input
        disabled={disabled}
        id={name}
        name={name}
        // placeholder={label && !hasFocus ? "" : placeholder}
        readOnly={readOnly}
        ref={ref}
        value={value?.toString() || ""}
        // onBlur={handleBlur}
        onChange={handleChange}
        // onFocus={handleFocus}
        // onKeyUp={handleKeyUp}
        {...libProps}
      />
    </Field>
  );
};

export const TextInput = memoize(forwardRef(TextInputWithRef));
TextInput.displayName = "TextInput";
