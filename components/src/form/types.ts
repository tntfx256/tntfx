import type { FieldProps } from "./field";

export type ElementProps<T extends object, V = string> = Partial<Omit<FieldProps & T, "onChange">> & {
  onChange?: (value: V) => void;
};
