import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    position: "relative",
    width: "100%",
    maxHeight: "100%",
    ...Style.mixins.overflow("hidden"),
    ...Style.mixins.border(Style.tokens.palette.border),
  },

  container: {
    position: "relative",
    width: "100%",
    minWidth: "100%",
    // scrollbar
    paddingRight: Style.tokens.spacing.md,
    paddingBottom: Style.tokens.spacing.md,
    ...Style.mixins.overflow("auto"),
  },

  table: {
    minWidth: "max-content",
    columnSpan: "none",
  },

  cell: {
    ...Style.mixins.paddingHorizontal("0px"),
    ...Style.mixins.overflow("hidden"),
    ...Style.mixins.center(),
  },
  headerCell: {
    minWidth: "8rem",
  },
  dataCell: {},

  title: {
    width: "100%",
    ...Style.mixins.padding(Style.tokens.spacing.md),
    ...Style.mixins.borderBottom(Style.tokens.palette.border),
  },

  caption: {
    width: "100%",
    textAlign: "center",
  },
});
