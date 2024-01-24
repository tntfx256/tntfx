import { comboboxClassNames, fieldClassNames, inputClassNames } from "@fluentui/react-components";
import { searchBoxClassNames } from "@fluentui/react-search-preview";
import { Style } from "@tntfx/theme";
import { MIN_INPUT_WIDTH } from "../const";

const classNames = [comboboxClassNames, inputClassNames, searchBoxClassNames];
const mainClassNames = [
  ...classNames.map((className) => `& .${className.root}`),
  ...classNames.map((className) => `& .${className.input}`),
].join(", ");

export const useStyle = Style.create({
  root: {
    position: "relative",
    minWidth: MIN_INPUT_WIDTH,
    maxWidth: `${Style.tokens.breakpoint.xs}px`,
    paddingTop: Style.tokens.spacing.md,
    paddingBottom: Style.tokens.spacing.md,
    // ...Style.mixins.border("1px solid green"),

    [`& .${fieldClassNames.label}`]: {
      position: "absolute",
      top: "-20%",
      left: 0,
    },

    [`& .${fieldClassNames.hint}`]: {
      position: "absolute",
      bottom: "-10%",
      right: 0,
    },

    [`& .${fieldClassNames.validationMessage}`]: {
      position: "absolute",
      bottom: "-10%",
      left: 0,
    },

    [`${mainClassNames}`]: {
      minWidth: 0,
    },
  },
});
