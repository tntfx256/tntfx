import { fieldClassNames } from "@fluentui/react-components";
import { Style } from "@tntfx/theme";
import { MIN_WIDTH } from "./const";

export const useStyle = Style.create({
  root: {
    position: "relative",
    minWidth: MIN_WIDTH,
    maxWidth: `${Style.tokens.breakpoint.sm}px`,
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
  },
});

export const useInputStyle = Style.create({
  root: {
    minWidth: MIN_WIDTH,
    ...Style.mixins.border("1px solid green"),
  },
});
