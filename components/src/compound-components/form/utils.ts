import type { Any, Option } from "@tntfx/core";

export const MAX_ITEMS = 128;
export const EmptyOption: Option<Any> = { id: "", title: "" };

export function extendOptions<T extends string>(options: Option<T>[], addEmpty = false): Option<T>[] {
  return addEmpty ? [EmptyOption, ...options] : [...options];
}
