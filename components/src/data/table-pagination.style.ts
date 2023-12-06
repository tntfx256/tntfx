import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    width: "100%",
    ...Style.mixins.padding(Style.tokens.spacing.md),
    ...Style.mixins.center(),

    // padding: theme.$spacing-md,
    // border-top: 0.5px solid theme.$color-border,
  },
});
