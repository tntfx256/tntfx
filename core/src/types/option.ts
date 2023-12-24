import type { IconName } from "@tntfx/icons";
import type { EnumString } from "./base";
import type { Accent, Size, Variant } from "./theme";

export type Option<T extends string = string> = {
  id: T;
  title: string;
  avatar?: string;
  children?: Option<T>[];
  disabled?: boolean;
  external?: boolean;
  hidden?: boolean;
  href?: string;
  icon?: IconName;
  iconPosition?: "start" | "end";
  path?: string;
  size?: EnumString<Size>;
  accent?: EnumString<Accent>;
  variant?: EnumString<Variant>;
};

export const OptionModel = {
  convert(options: ReadonlyArray<string>) {
    type T = (typeof options)[number];
    return options.map((id) => ({ id, title: id })) as Option<T>[];
  },
};
