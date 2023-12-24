import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    width: "100%",
    justifyContent: "space-between",
    maxHeight: Style.tokens.size.md,
    ...Style.mixins.center(),
  },

  stat: {
    // flexGrow: "1",
    // justifyContent: "flex-end",
    position: "absolute",
    right: 0,
  },

  pager: {
    flexGrow: "1",
    justifyContent: "center",
    paddingRight: Style.tokens.spacing.xxl,
  },
});
