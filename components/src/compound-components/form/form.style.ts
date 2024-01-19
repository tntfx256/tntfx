import { comboboxClassNames, fieldClassNames } from "@fluentui/react-components";
import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    fontFamily: "inherit",
    maxWidth: `${Style.tokens.breakpoint.sm}px`,
    // ...Style.mixins.border("2px solid red"),

    [`& .${comboboxClassNames.root}`]: {},
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
    ...Style.mixins.border("1px solid blue"),

    [`& .${fieldClassNames.root}`]: {
      // width: "100%",
      // maxWidth: "100%",
      // marginTop: Style.tokens.spacing.md,
      // marginBottom: Style.tokens.spacing.sm,
      ...Style.mixins.border("1px solid yellow"),

      [`& + .${fieldClassNames.root}`]: {
        marginLeft: Style.tokens.spacing.sm,
      },
    },
  },
});

export const useStackStyle = Style.create({
  root: {
    ...Style.mixins.padding(Style.tokens.spacing.sm),
    ...Style.mixins.border("1px solid brown"),
    maxWidth: "100%",
    flexGrow: 1,

    [`& .${fieldClassNames.root}`]: {
      marginTop: Style.tokens.spacing.md,
      // marginBottom: Style.tokens.spacing.sm,
      width: "100%",
    },
  },
});
