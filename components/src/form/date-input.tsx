import type { ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps } from "@fluentui/react-components";
import { Field } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import type { Any, Nullable } from "@tntfx/core";
import type { ElementProps } from "./types";

export type DateInputProps = ElementProps<FieldProps & DatePickerProps, Date>;

function DateInputWithRef(props: DateInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { label, hint, required, validationMessage, validationMessageIcon, validationState, onChange, value, ...rest } =
    props;

  const handleChange = useCallback(
    (date: Any<Date>) => {
      if (date) {
        onChange?.(date);
      }
    },
    [onChange]
  );

  let date: Nullable<Date> = null;
  if (value) {
    date = value instanceof Date ? value : new Date(value);
  }

  return (
    <Field
      hint={hint}
      label={label}
      required={required}
      validationMessage={validationMessage}
      validationMessageIcon={validationMessageIcon}
      validationState={validationState}
    >
      <DatePicker showMonthPickerAsOverlay ref={ref} value={date} onSelectDate={handleChange} {...rest} />
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
