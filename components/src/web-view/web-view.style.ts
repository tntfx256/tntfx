import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    // ...Style.mixins.border("1px solid red"),
    flexGrow: 1,
    overflowX: "hidden",
    overflowY: "hidden",
  },
});
