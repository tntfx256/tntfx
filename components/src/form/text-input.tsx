import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, InputOnChangeData, InputProps } from "@fluentui/react-components";
import { Field, Input } from "@fluentui/react-components";
import type { ElementProps } from "./types";

export type TextInputProps = ElementProps<FieldProps & InputProps>;

const TextInputWithRef = (props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, required, validationMessage, validationMessageIcon, validationState, hint, onChange, ...libProps } = props;

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      onChange?.(data.value);
    },
    [onChange]
  );

  return (
    <Field
      hint={hint}
      label={label}
      required={required}
      validationMessage={validationMessage}
      validationMessageIcon={validationMessageIcon}
      validationState={validationState}
    >
      <Input ref={ref} required={required} onChange={handleChange} {...libProps} />
    </Field>
  );
};

export const TextInput = forwardRef(TextInputWithRef);
TextInput.displayName = "TextInput";

export function ControlledTextInput(props: TextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <TextInput
          validationMessage={fieldState.error?.message || " "}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
