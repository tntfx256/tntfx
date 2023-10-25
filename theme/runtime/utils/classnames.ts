import type { Any, TObject } from "@tntfx/core";
import { splitBySpace } from "./utils";

type ClassNames = undefined | string | TObject<Any> | [baseClassNames: string | undefined, postfix: string];
export function classNames(...names: ClassNames[]) {
  const list = new Set<string>();

  for (const name of names) {
    if (!name) {
      continue;
    }
    if (typeof name === "string") {
      splitBySpace(name).forEach((n: string) => list.add(n));
    } else if (Array.isArray(name)) {
      splitBySpace(name[0]).forEach((n: string) => list.add(`${n}${name[1]}`));
    } else {
      Object.entries(name).forEach(([k, v]) => (v ? list.add(k) : 0));
    }
  }

  return Array.from(list).join(" ");
}
