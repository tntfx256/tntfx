import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.marginHorizontal(Style.tokens.spacing.xs),

    "&:last-child": {
      marginBlockEnd: 0,
    },
  },
});
