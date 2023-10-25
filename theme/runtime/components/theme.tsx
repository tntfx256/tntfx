import type { PropsWithChildren } from "react";
import "../../scss/styles/index.scss";

export function ThemeProvider({ children }: PropsWithChildren) {
  return children;
}
