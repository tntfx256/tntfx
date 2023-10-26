import type { PropsWithChildren } from "react";
import "../styles/base.scss";

export function ThemeProvider({ children }: PropsWithChildren) {
  return children;
}
