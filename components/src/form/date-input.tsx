import type { PropsWithChildren } from "react";
import { TextInput, type TextInputProps } from "./text-input";
import "./date-input.scss";

export type DateInputProps = TextInputProps;

export function DateInput(props: PropsWithChildren<DateInputProps>) {
  return <TextInput className="dateInput" {...props} type="date" />;
}
