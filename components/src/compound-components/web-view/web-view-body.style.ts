import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.border("1px solid blue"),
    ...Style.mixins.padding(Style.tokens.spacing.lg),
    flexGrow: 1,
  },
});
