import type { ChangeEvent, ForwardedRef, KeyboardEvent, MouseEvent } from "react";
import { forwardRef, useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { ComboboxProps, FieldProps } from "@fluentui/react-components";
import { Combobox, Field, Option, ProgressBar } from "@fluentui/react-components";
import type { Option as TOption } from "@tntfx/core";
import { Icon } from "@tntfx/icons";
import { useStyle } from "./select.style";
import type { ElementProps } from "./types";

export type OptionOnSelectData<T extends string = string> = {
  optionValue?: T;
  optionText?: T;
  selectedOptions: T[];
};

export type SelectionEvents = ChangeEvent<HTMLElement> | KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>;

export type SelectProps<T extends string = string, M extends boolean = false> = ElementProps<
  FieldProps &
    ComboboxProps & {
      multiselect: M;
      options: TOption<T>[];
      loading: boolean;
      filterable: boolean;
      onFilterChange: (value: string) => void;
    },
  M extends true ? T[] : T
>;

function SelectWithRef<T extends string = string, M extends boolean = false>(
  props: SelectProps<T, M>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    name,
    label,
    value,
    options = [],
    onChange,
    placeholder,
    multiselect,
    validationMessage,
    validationMessageIcon,
    validationState,
    loading,
    onFilterChange,
    filterable,
    ...rest
  } = props;

  const classes = useStyle();

  const changeHandler = useCallback(
    (_event: SelectionEvents, data: OptionOnSelectData) => {
      onChange?.(multiselect ? data.selectedOptions : (data.selectedOptions[0] as any));
    },
    [multiselect, onChange]
  );

  const filterHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (filterable && onFilterChange) {
        onFilterChange(ev.target.value);
      }
    },
    [filterable, onFilterChange]
  );

  const isFreeForm = filterable && !onFilterChange;

  return (
    <Field
      label={label}
      validationMessage={validationMessage}
      validationMessageIcon={validationMessageIcon}
      validationState={validationState}
    >
      <Combobox
        freeform={isFreeForm}
        multiselect={multiselect}
        name={name}
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={filterHandler}
        onOptionSelect={changeHandler}
        {...rest}
      >
        {options.map(({ id, title, disabled, icon }) => (
          <Option key={id} disabled={disabled} text={title}>
            {icon && <Icon name={icon} />}
            {title}
          </Option>
        ))}
      </Combobox>
      {loading && <ProgressBar className={classes.loader} />}
    </Field>
  );
}

export const Select = forwardRef(SelectWithRef) as <T extends string = string, M extends boolean = false>(
  props: SelectProps<T, M> & { ref?: ForwardedRef<HTMLButtonElement> }
) => JSX.Element;

export function ControlledSelect<T extends string = string, M extends boolean = false>(props: SelectProps<T, M>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
      render={({ field, fieldState }) => (
        <Select<T, M>
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
