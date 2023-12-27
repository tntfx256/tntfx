import type { ChangeEvent, ForwardedRef, MouseEvent } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, InputOnChangeData } from "@fluentui/react-components";
import { Field } from "@fluentui/react-components";
import type { SearchBoxProps } from "@fluentui/react-search-preview";
import { SearchBox } from "@fluentui/react-search-preview";
import type { ElementProps } from "./types";

export type SearchInputProps = ElementProps<FieldProps & SearchBoxProps>;

const SearchInputWithRef = (props: SearchInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, required, validationMessage, validationMessageIcon, validationState, hint, onChange, ...libProps } = props;

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      onChange?.(data.value);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (ev: MouseEvent<HTMLDivElement>) => {
      if ((ev.target as HTMLElement).tagName?.toLowerCase() === "svg") {
        ev.stopPropagation();
        onChange?.("");
      }
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
      onClick={handleClear}
    >
      <SearchBox ref={ref} required={required} onChange={handleChange} {...libProps} />
    </Field>
  );
};

export const SearchInput = forwardRef(SearchInputWithRef);
SearchInput.displayName = "TextInput";

export function ControlledSearchInput(props: SearchInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field, fieldState }) => (
        <SearchInput
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
