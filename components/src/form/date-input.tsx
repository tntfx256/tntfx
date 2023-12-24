import { type ForwardedRef, forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps } from "@fluentui/react-components";
import { Field } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import type { ElementProps } from "./types";

export type DateInputProps = ElementProps<FieldProps & DatePickerProps>;

function DateInputWithRef(props: DateInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { label, hint, required, validationMessage, validationMessageIcon, validationState, ...rest } = props;

  return (
    <Field
      hint={hint}
      label={label}
      required={required}
      validationMessage={validationMessage}
      validationMessageIcon={validationMessageIcon}
      validationState={validationState}
    >
      <DatePicker ref={ref} {...rest} />
    </Field>
  );
}

export const DateInput = forwardRef(DateInputWithRef);
DateInput.displayName = "DateInput";

export function ControlledDateInput(props: DateInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
      render={({ field, fieldState }) => (
        <DateInput
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
