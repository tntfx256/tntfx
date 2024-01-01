import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, SwitchOnChangeData, SwitchProps } from "@fluentui/react-components";
import { Switch } from "@fluentui/react-components";
import { withFieldWrapper } from "./field";
import type { ElementProps } from "./types";

export type ToggleProps = ElementProps<FieldProps & SwitchProps, boolean>;

function ToggleWithRef(props: ToggleProps, ref: ForwardedRef<HTMLInputElement>) {
  const { onChange, ...libProps } = props;

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
      onChange?.(!!data.checked);
    },
    [onChange]
  );

  return <Switch ref={ref} onChange={handleChange} {...libProps} />;
}

export const Toggle = withFieldWrapper(forwardRef(ToggleWithRef));
Toggle.displayName = "Toggle";

export function ControlledToggle(props: ToggleProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
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
