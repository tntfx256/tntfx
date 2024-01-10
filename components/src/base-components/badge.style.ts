import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    position: "relative",
    ...Style.mixins.overflow("visible"),
    width: "fit-content",
    height: "fit-content",
  },

  badge: {
    position: "absolute",
    top: "0",
    right: "0",
    transform: "translate(45%, -45%)",
  },
});
