import { fieldClassNames } from "@fluentui/react-components";
import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  field: {
    ...Style.mixins.padding(Style.tokens.spacing.sm),
  },
  root: {
    alignItems: "center",
    // ...Style.mixins.border("1px solid blue"),

    [`& .${fieldClassNames.root}`]: {
      [`& + .${fieldClassNames.root}`]: {
        marginLeft: Style.tokens.spacing.sm,
      },
    },
  },
});
