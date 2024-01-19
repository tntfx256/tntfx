import type { ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, InputProps } from "@fluentui/react-components";
import { Input } from "@fluentui/react-components";
import type { Defined } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { withFieldWrapper } from "./field";
import { useInputStyle } from "./field.style";
import type { ElementProps } from "./types";
import { interceptRef } from "../../utils";

export type TextInputProps = ElementProps<FieldProps & InputProps>;

const TextInputWithRef = (props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { onChange, className, ...libProps } = props;

  const classes = useInputStyle();
  const handleChange = useCallback<Defined<InputProps["onChange"]>>(
    (ev, data) => {
      onChange?.(data.value);
    },
    [onChange]
  );

  return (
    <Input className={classNames(classes.root, className)} ref={interceptRef(ref)} onChange={handleChange} {...libProps} />
  );
};

export const TextInput = withFieldWrapper(forwardRef(TextInputWithRef));
TextInput.displayName = "TextInput";

export function ControlledTextInput(props: TextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
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
