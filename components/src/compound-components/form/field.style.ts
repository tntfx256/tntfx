import { fieldClassNames } from "@fluentui/react-components";
import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    position: "relative",
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
