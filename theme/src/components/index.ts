import { makeStyles } from "@fluentui/react-components";
import { mixins } from "./mixins";
import { tokens } from "./tokens";

export { useGlobalStyle } from "./style-global";
export { useResetStyle } from "./style-reset";
export type { ColorScheme } from "./theme-provider";
export { ThemeProvider } from "./theme-provider";
export type { Theme } from "@fluentui/react-components";
export {
  mergeClasses as classNames,
  createDarkTheme,
  createLightTheme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

export const Style = {
  create: makeStyles,
  tokens,
  mixins,
};
