import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.padding(0),
    ...Style.mixins.overflow("hidden"),
    // ...Style.mixins.border("2px solid red"),
    zIndex: Style.tokens.layer.modal,
  },
  active: {
    zIndex: Style.tokens.layer.modal + 1,
  },

  wrapper: {
    ...Style.mixins.padding(0),
  },

  titlebar: {
    ...Style.mixins.fill(),
    ...Style.mixins.row(),
    bottom: "auto",
    height: Style.tokens.size.xl,
    justifyContent: "space-between",
    backdropFilter: `blur(${Style.tokens.blur.md})`,
    // backgroundColor: Style.tokens.palette.bodyAlpha,
    zIndex: 3,
    paddingLeft: Style.tokens.spacing.md,
    fontWeight: Style.tokens.fontWeight.md,
  },
  titlebarIcon: {
    paddingLeft: Style.tokens.spacing.sm,
    ...Style.mixins.border("blue"),
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
  titlebarCloseIcon: {
    // backgroundColor: "transparent",
    ...Style.mixins.transition("backgroundColor"),

    [`&:hover`]: {
      cursor: "pointer",
      color: Style.tokens.palette.errorText,
    },
  },

  headerPlaceholder: {
    height: Style.tokens.size.sm,
  },

  body: {
    ...Style.mixins.borderRadius(Style.tokens.borderRadius.lg),
    ...Style.mixins.padding(Style.tokens.spacing.lg),
    ...Style.mixins.margin(0),
  },

  footer: {
    ...Style.mixins.padding(Style.tokens.spacing.sm),
    paddingTop: 0,
  },
});
