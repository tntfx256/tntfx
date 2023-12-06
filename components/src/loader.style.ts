import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.fill(),
    ...Style.mixins.center(),
    backgroundColor: Style.tokens.palette.backdrop,
    zIndex: Style.tokens.layer.modal,
  },
  trnsparent: {
    backgroundColor: "transparent",
  },
  blur: {
    backgroundColor: "transparent",
    backdropFilter: `blur(${Style.tokens.blur.md})`,
  },

  spinner: {},
});
