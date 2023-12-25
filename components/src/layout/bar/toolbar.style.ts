import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.row(),
    ...Style.mixins.overflow("visible"),
    minHeight: Style.tokens.size.xl,
    maxHeight: Style.tokens.size.xl,
  },

  title: {
    paddingLeft: Style.tokens.spacing.md,
    fontWeight: Style.tokens.fontWeight.sm,
  },
});
