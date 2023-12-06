import type { FieldProps } from "@fluentui/react-components";
import { Field } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";

export type DateInputProps = Partial<FieldProps & DatePickerProps>;

export function DateInput(props: DateInputProps) {
  const { label, ...rest } = props;

  return (
    <Field label={label}>
      <DatePicker {...rest} />
    </Field>
  );
}
