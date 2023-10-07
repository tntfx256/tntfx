import type { PropsWithChildren } from "react";
// reset should be first
import "./styles/reset.scss";
// and then the global
import "./styles/globals.scss";

export function Reset(props: PropsWithChildren) {
  return <>{props.children}</>;
}
