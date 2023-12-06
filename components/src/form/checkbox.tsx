import type { ChangeEvent } from "react";
import { useCallback } from "react";
import type { CheckboxOnChangeData, CheckboxProps as LibCheckboxProps } from "@fluentui/react-components";
import { Checkbox as LibCheckbox } from "@fluentui/react-components";

export type CheckboxProps = Omit<LibCheckboxProps, "onChange"> & {
  onChange?: (value: "mixed" | boolean, name?: string) => void;
};

export function Checkbox(props: CheckboxProps) {
  const { onChange, name, ...libProps } = props;

  const handleChange = useCallback(
    (_ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
      onChange?.(data.checked, name);
    },
    [name, onChange]
  );

  return <LibCheckbox name={name} onChange={handleChange} {...libProps} />;
}
