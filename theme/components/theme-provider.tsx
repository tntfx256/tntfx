import { type PropsWithChildren } from "react";
import "../styles/base/index.scss";

export function ThemeProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}
