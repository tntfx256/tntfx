import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, InputProps } from "@fluentui/react-components";
import { Field, Input } from "@fluentui/react-components";
import type { ElementProps } from "./types";

export type TextInputProps = ElementProps<FieldProps & InputProps>;

const TextInputWithRef = (props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, required, validationMessage, validationMessageIcon, validationState, hint, ...libProps } = props;

  return (
    <Field
      hint={hint}
      label={label}
      required={required}
      validationMessage={validationMessage}
      validationMessageIcon={validationMessageIcon}
      validationState={validationState}
    >
      <Input ref={ref} required={required} {...libProps} />
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
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
