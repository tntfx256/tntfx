import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.paddingHorizontal(Style.tokens.spacing.md),
    ...Style.mixins.overflow("hidden"),
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
  center: {
    textAlign: "center",
  },
});
