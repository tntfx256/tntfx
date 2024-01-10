import type { FC, ForwardedRef } from "react";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { ComboboxProps as LibComboboxProps, FieldProps } from "@fluentui/react-components";
import { Combobox as LibCombobox, Option, ProgressBar } from "@fluentui/react-components";
import type { Defined, Option as TOption } from "@tntfx/core";
import { withFieldWrapper } from "./field";
import type { ElementProps } from "./types";
import { extendOptions, MAX_ITEMS } from "./utils";
import { Icon } from "../../base-components";
import { useWatchEffect } from "../../hooks";

export type ComboboxProps<T extends string = string, M extends boolean = false> = ElementProps<
  FieldProps &
    LibComboboxProps & {
      multiselect: M;
      options: TOption<T>[];
      loading: boolean;
      // onFilterChange: (value: string) => void;
    },
  M extends true ? T[] : T
>;

function ComboboxWithRef<T extends string = string, M extends boolean = false>(
  props: ComboboxProps<T, M>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { options = [], onChange, placeholder, multiselect, loading, value, ...rest } = props;

  const [text, setText] = useState<string>(value || "");
  const [matchingOptions, setMatchingOptions] = useState<TOption[]>([]);

  useWatchEffect(() => {
    setText(value || "");
  }, [value]);

  useWatchEffect(() => {
    setMatchingOptions(() => extendOptions(options, !rest.required));
  }, [options, rest.required]);

  const optionSelectHandler = useCallback<Defined<LibComboboxProps["onOptionSelect"]>>(
    (ev, data) => {
      onChange?.(multiselect ? data.selectedOptions : (data.selectedOptions[0] as any));
      setText(data.optionText || "");
    },
    [multiselect, onChange]
  );

  const textChangeHandler = useCallback<Defined<LibComboboxProps["onChange"]>>(
    (ev) => {
      const value = ev.target.value;
      setText(value);
      if (value.length > 1) {
        const val = value.trim().toLowerCase();
        const matches = options.filter(({ title }) => title.toLowerCase().includes(val));
        setMatchingOptions(matches);
      } else {
        setMatchingOptions(() => extendOptions(options, !rest.required));
      }
    },
    [options, rest.required]
  );

  const slicedOptions = useMemo(() => matchingOptions.slice(0, MAX_ITEMS), [matchingOptions]);
  // let hint = matchingOptions.length > MAX_ITEMS ? `Showing ${MAX_ITEMS} of ${matchingOptions.length} items` : "";

  return (
    <>
      <LibCombobox
        freeform
        multiselect={multiselect}
        placeholder={placeholder}
        ref={ref}
        onChange={textChangeHandler}
        onOptionSelect={optionSelectHandler}
        {...rest}
        value={text}
      >
        {slicedOptions.map(({ id, title, disabled, icon }) => (
          <Option key={id} disabled={disabled} text={title} value={id}>
            {icon && <Icon name={icon} />}
            {title}
          </Option>
        ))}
      </LibCombobox>
      {loading && <ProgressBar />}
    </>
  );
}

export const Combobox = withFieldWrapper(forwardRef(ComboboxWithRef)) as <
  T extends string = string,
  M extends boolean = false,
>(
  props: ComboboxProps<T, M> & { ref?: ForwardedRef<HTMLButtonElement> }
) => JSX.Element;
(Combobox as FC).displayName = "Combobox";

export function ControlledCombobox<T extends string = string, M extends boolean = false>(props: ComboboxProps<T, M>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.name!}
      render={({ field, fieldState }) => (
        <Combobox<T, M>
          validationMessage={fieldState.error?.message}
          validationState={fieldState.invalid ? "error" : "none"}
          {...field}
          {...props}
        />
      )}
    />
  );
}
