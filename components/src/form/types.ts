export type ElementProps<T> = Partial<Omit<T, "name">> & {
  name: string;
};
