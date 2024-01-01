import type { ChangeEvent, ForwardedRef } from "react";
import { forwardRef, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldProps, InputOnChangeData } from "@fluentui/react-components";
import type { SearchBoxProps } from "@fluentui/react-search-preview";
import { SearchBox } from "@fluentui/react-search-preview";
import { withFieldWrapper } from "./field";
import type { ElementProps } from "./types";

export type SearchInputProps = ElementProps<FieldProps & SearchBoxProps>;

const SearchInputWithRef = (props: SearchInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { onChange, ...libProps } = props;

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      onChange?.(data.value);
    },
    [onChange]
  );

  // const handleClear = useCallback(
  //   (ev: MouseEvent<HTMLDivElement>) => {
  //     if ((ev.target as HTMLElement).tagName?.toLowerCase() === "svg") {
  //       ev.stopPropagation();
  //       onChange?.("");
  //     }
  //   },
  //   [onChange]
  // );

  return <SearchBox ref={ref} onChange={handleChange} {...libProps} />;
};

export const SearchInput = withFieldWrapper(forwardRef(SearchInputWithRef));
SearchInput.displayName = "TextInput";

export function ControlledSearchInput(props: SearchInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
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
