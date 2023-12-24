import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.border("red"),
  },

  cell: {
    minWidth: "fit-content",
    ...Style.mixins.overflow("hidden"),
    ...Style.mixins.padding(Style.tokens.spacing.sm, "0", Style.tokens.spacing.xs, "0"),
    ...Style.mixins.border("green"),
  },
});
