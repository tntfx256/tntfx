import type { FunctionComponent } from "react";
import { memo } from "react";
import isEqual from "react-fast-compare";

export function memoize<P>(component: FunctionComponent<P>) {
  return memo(component, isEqual);
}

export { isEqual };
