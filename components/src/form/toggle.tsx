import { type ForwardedRef, forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, SwitchProps } from "@fluentui/react-components";
import { Field, Switch } from "@fluentui/react-components";
import type { ElementProps } from "./types";

export type ToggleProps = ElementProps<FieldProps & SwitchProps>;

function ToggleWithRef(props: ToggleProps, ref: ForwardedRef<HTMLInputElement>) {
  const { required, validationMessage, validationMessageIcon, validationState, hint, ...libProps } = props;

  return (
    <Field
      hint={hint}
      required={required}
      validationMessage={validationMessage}
      validationMessageIcon={validationMessageIcon}
      validationState={validationState}
    >
      <Switch ref={ref} required={required} {...libProps} />
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
