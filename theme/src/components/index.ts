import {
  buttonClassNames,
  dropdownClassNames,
  fieldClassNames,
  inputClassNames,
  makeStyles,
  selectClassNames,
  textClassNames,
} from "@fluentui/react-components";
import { mixins } from "./mixins";
import { tokens } from "./tokens";

export { useGlobalStyle } from "./style-global";
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
  classNames: {
    button: buttonClassNames,
    field: fieldClassNames,
    text: textClassNames,
    input: inputClassNames,
    dropdown: dropdownClassNames,
    select: selectClassNames,
    icon: {
      root: "fui-Icon",
    },
  },
};
