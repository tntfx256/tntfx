import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.padding(0),
    ...Style.mixins.overflow("hidden"),
  },

  titlebar: {
    ...Style.mixins.fill(),
    ...Style.mixins.row(),
    bottom: "auto",
    height: Style.tokens.size.xl,
    justifyContent: "space-between",
    backdropFilter: `blur(${Style.tokens.blur.md})`,
    backgroundColor: Style.tokens.palette.bodyAlpha,
    zIndex: 3,
  },
  titlebarIcon: {
    paddingLeft: Style.tokens.spacing.sm,
    ...Style.mixins.border("blue"),
  },
  titlebarTitle: {
    fontWeight: Style.tokens.fontWeight.sm,
    paddingLeft: Style.tokens.spacing.sm,
  },
  titlebarControls: {
    position: "absolute",
    top: 0,
    right: 0,
    fontWeight: Style.tokens.fontWeight.sm,
    paddingLeft: Style.tokens.spacing.sm,
  },
  titlebarControlsIcon: {
    ...Style.mixins.padding(Style.tokens.borderRadius.md, Style.tokens.borderRadius.lg),
  },

  headerPlaceholder: {
    height: `calc(1.125 * ${Style.tokens.size.sm})`,
  },

  body: {
    ...Style.mixins.borderRadius(Style.tokens.borderRadius.lg),
    ...Style.mixins.padding(Style.tokens.spacing.lg, Style.tokens.borderRadius.xl),
    ...Style.mixins.margin(0),
  },
});
