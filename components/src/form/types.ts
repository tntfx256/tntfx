export type ElementProps<T, V = string, N extends string = string> = Partial<Omit<T, "name" | "onChange">> & {
  name: N;
  onChange?: (value: V) => void;
};
