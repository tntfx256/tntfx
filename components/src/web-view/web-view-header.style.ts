import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    // ...Style.mixins.border("2px solid green"),
    flexGrow: 1,
  },
  actions: {
    ...Style.mixins.border("1px solid black"),
  },
  addressBar: {
    ...Style.mixins.border("1px solid red"),
    flexGrow: 1,
  },
  addressInput: {
    marginLeft: Style.tokens.spacing.lg,
    ...Style.mixins.border("1px solid black"),
    flexGrow: 1,
  },
});
