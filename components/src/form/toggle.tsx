import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, SwitchOnChangeData, SwitchProps } from "@fluentui/react-components";
import { Field, Switch } from "@fluentui/react-components";
import type { ElementProps } from "./types";

export type ToggleProps = ElementProps<FieldProps & SwitchProps, boolean>;

function ToggleWithRef(props: ToggleProps, ref: ForwardedRef<HTMLInputElement>) {
  const { required, validationMessage, validationMessageIcon, validationState, hint, onChange, ...libProps } = props;

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
      onChange?.(!!data.checked);
    },
    [onChange]
  );

  return (
    <Field
      hint={hint}
      required={required}
      validationMessage={validationMessage}
      validationMessageIcon={validationMessageIcon}
      validationState={validationState}
    >
      <Switch ref={ref} required={required} onChange={handleChange} {...libProps} />
    </Field>
  );
}

export const Toggle = forwardRef(ToggleWithRef);
Toggle.displayName = "Toggle";

export function ControlledToggle(props: ToggleProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <Toggle
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
