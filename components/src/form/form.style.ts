import { fieldClassNames } from "@fluentui/react-components";
import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    maxWidth: `${Style.tokens.breakpoint.sm}px`,
    // ...Style.mixins.border("2px solid red"),
  },
  legend: {},
  actions: {},
});

export const useRowStyle = Style.create({
  field: {
    ...Style.mixins.padding(Style.tokens.spacing.sm),
  },
  root: {
    alignItems: "center",
    justifyContent: "space-between",

    [`& .${fieldClassNames.root}`]: {
      width: "100%",

      [`& + .${fieldClassNames.root}`]: {
        marginLeft: Style.tokens.spacing.sm,
      },
    },
  },
});

export const useStackStyle = Style.create({
  root: {
    ...Style.mixins.padding(Style.tokens.spacing.sm),

    [`& .${fieldClassNames.root}`]: {
      marginBottom: Style.tokens.spacing.sm,
      width: "100%",
    },
  },
});
