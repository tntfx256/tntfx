import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { CheckboxOnChangeData, CheckboxProps as LibCheckboxProps, FieldProps } from "@fluentui/react-components";
import { Checkbox as LibCheckbox, Field } from "@fluentui/react-components";
import type { ElementProps } from "./types";

export type CheckboxProps = ElementProps<FieldProps & LibCheckboxProps, boolean>;

function CheckboxWithRef(props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) {
  const { label, hint, required, validationMessage, validationMessageIcon, validationState, onChange, ...libProps } = props;

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
      onChange?.(!!data.checked);
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
      <LibCheckbox ref={ref} onChange={handleChange} {...libProps} />
    </Field>
  );
}

export const Checkbox = forwardRef(CheckboxWithRef);
Checkbox.displayName = "Checkbox";

export function ControlledCheckbox(props: CheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
      render={({ field, fieldState }) => (
        <Checkbox
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
