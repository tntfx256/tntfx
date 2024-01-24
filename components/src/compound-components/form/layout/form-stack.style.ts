import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.padding(Style.tokens.spacing.sm),
    maxWidth: "100%",
    flexGrow: 1,

    // [`& .${fieldClassNames.root}`]: {
    //   [`& + .${fieldClassNames.root}`]: {
    //     marginTop: Style.tokens.spacing.sm,
    //   },
    // },
  },
});
