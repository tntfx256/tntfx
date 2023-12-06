import { Style } from "@tntfx/theme";

export const useBoxClasses = Style.create({
  box: {
    position: "relative",
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },

  horizontal: {
    ...Style.mixins.row(),
  },
});
