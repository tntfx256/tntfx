import type { FC, ForwardedRef } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { ComboboxProps as LibComboboxProps, FieldProps } from "@fluentui/react-components";
import { Combobox as LibCombobox, Option, OptionGroup, ProgressBar } from "@fluentui/react-components";
import type { Defined, Option as TOption } from "@tntfx/core";
import { Icon } from "../../../base-components";
import { EMPTY_ARRAY } from "../const";
import { withFieldWrapper } from "../layout/field";
import type { ElementProps } from "../types";
import { MAX_ITEMS } from "../utils";

export type SelectProps<T extends string = string, M extends boolean = false> = ElementProps<
  FieldProps &
    LibComboboxProps & {
      multiselect: M;
      options: TOption<T>[];
      loading: boolean;
      searchable: boolean;
      // onFilterChange: (value: string) => void;
    },
  M extends true ? T[] : T
>;

function SelectWithRef<T extends string = string, M extends boolean = false>(
  props: SelectProps<T, M>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    options = EMPTY_ARRAY,
    placeholder,
    multiselect,
    loading,
    value,
    onChange,
    searchable,
    // onFilterChange,
    onFocus,
    onBlur,
    ...rest
  } = props;

  // const filterable = !!onFilterChange;
  const [text, setText] = useState<string>(value || "");
  const [filteredOptions, setFilteredOptions] = useState<TOption<T>[]>(options);
  // const [selectedOptions, setSelectedOptions] = useState<TOption<T>[]>(EMPTY_ARRAY);

  // const findSelectedOptions = useCallback(() => {
  //   if (multiselect) {
  //     const selectedOptions = options.filter((option) => value?.includes(option.id));
  //     onChange(selectedOptions);
  //   } else {
  //     const selectedOption = options.find((option) => value?.includes(option.id));
  //     setSelectedOptions(selectedOption ? [selectedOption] : EMPTY_ARRAY);
  //   }
  // }, [multiselect, options, value]);

  const findFilteredOptions = useCallback(
    (text: string) => {
      // const selectedOptions = options.filter((option) => value?.includes(option.id));
      // setSelectedOptions(selectedOptions);
      text = text.toLowerCase();
      if (text.length > 2) {
        const filteredOptions = options.filter((option) => option.title.toLowerCase().includes(text));
        setFilteredOptions(filteredOptions);
      } else {
        setFilteredOptions(options);
      }
    },
    [options]
  );

  const handleFocus = useCallback<Defined<LibComboboxProps["onFocus"]>>(
    (e) => {
      if (searchable) {
        setText("");
        setFilteredOptions(options);
      }
      onFocus?.(e);
    },
    [onFocus, options, searchable]
  );

  const handleBlur = useCallback<Defined<LibComboboxProps["onBlur"]>>(
    (e) => {
      // if it's not multiselect, then the text is set on optionSelectHandler
      if (multiselect) {
        const selectedOptions = options
          .filter((option) => value?.includes(option.id))
          .map((option) => option.title)
          .join(", ");
        setText(selectedOptions);
      }
      onBlur?.(e);
    },
    [multiselect, onBlur, options, value]
  );

  const optionSelectHandler = useCallback<Defined<LibComboboxProps["onOptionSelect"]>>(
    (ev, data) => {
      onChange?.(multiselect ? data.selectedOptions : (data.selectedOptions[0] as any));
      if (!multiselect) {
        setText(data.optionText || "");
      }
    },
    [multiselect, onChange]
  );

  const textChangeHandler = useCallback<Defined<LibComboboxProps["onChange"]>>(
    (ev) => {
      const value = ev.target.value;
      setText(value);
      findFilteredOptions(value);
    },
    [findFilteredOptions]
  );

  const slicedOptions = useMemo(
    () => (filteredOptions.length > MAX_ITEMS ? filteredOptions.slice(0, MAX_ITEMS) : filteredOptions),
    [filteredOptions]
  );

  return (
    <>
      <LibCombobox
        freeform={searchable}
        multiselect={multiselect}
        placeholder={placeholder}
        ref={ref}
        onBlur={handleBlur}
        onChange={textChangeHandler}
        onFocus={handleFocus}
        onOptionSelect={optionSelectHandler}
        {...rest}
        value={text}
      >
        {slicedOptions.map(({ id, title, disabled, icon, children }) =>
          children ? (
            <OptionGroup key={id} label={title}>
              {children.map(({ id, title, disabled, icon }) => (
                <Option key={id} disabled={disabled} text={title} value={id}>
                  {icon && <Icon name={icon} />}
                  {title}
                </Option>
              ))}
            </OptionGroup>
          ) : (
            <Option key={id} disabled={disabled} text={title} value={id}>
              {icon && <Icon name={icon} />}
              {title}
            </Option>
          )
        )}
      </LibCombobox>
      {loading && <ProgressBar />}
    </>
  );
}

export const Select = withFieldWrapper(forwardRef(SelectWithRef)) as <T extends string = string, M extends boolean = false>(
  props: SelectProps<T, M> & { ref?: ForwardedRef<HTMLInputElement> }
) => JSX.Element;
(Select as FC).displayName = "Select";

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
