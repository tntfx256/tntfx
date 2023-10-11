import type { Size, Variant } from "./base";
import type { IconName } from "../icon";

export type Option<T extends string = string> = {
  id: T;
  title: string;
  avatar?: string;
  children?: Option[];
  disabled?: boolean;
  external?: boolean;
  hidden?: boolean;
  href?: string;
  icon?: IconName;
  iconPosition?: "start" | "end";
  path?: string;
  size?: Size;
  variant?: Variant;
};
