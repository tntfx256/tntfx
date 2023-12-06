import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useCallback } from "react";
import type { DropdownProps, FieldProps } from "@fluentui/react-components";
import { Dropdown, Field, Option } from "@fluentui/react-components";
import type { Option as TOption } from "@tntfx/core";
import { Box } from "../layout";

export type OptionOnSelectData<T extends string = string> = {
  optionValue?: T;
  optionText?: T;
  selectedOptions: T[];
};

export type SelectionEvents = ChangeEvent<HTMLElement> | KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>;

export type SelectProps<T extends string = string, M extends boolean = false> = Partial<
  Omit<FieldProps, "onChange"> &
    Omit<DropdownProps, "onChange"> & {
      multiselect: M;
      onChange: (value: M extends true ? T[] : T, name?: string) => void;
      options: TOption<T>[];
    }
>;

export function Select<T extends string = string, M extends boolean = false>(props: SelectProps<T, M>) {
  const { name, label, value, options = [], onChange, placeholder, multiselect } = props;

  const changeHandler = useCallback(
    (_event: SelectionEvents, data: OptionOnSelectData) => {
      onChange?.(multiselect ? data.selectedOptions : (data.selectedOptions[0] as any), name);
    },
    [multiselect, name, onChange]
  );

  return (
    <Field label={label}>
      <Dropdown multiselect={multiselect} name={name} placeholder={placeholder} value={value} onOptionSelect={changeHandler}>
        {options.map(({ id, title, disabled, icon }) => (
          <Option key={id} disabled={disabled} text={title}>
            <Box horizontal>{icon}</Box>
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
}
