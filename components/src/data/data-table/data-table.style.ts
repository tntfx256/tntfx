import { tableHeaderCellClassNames } from "@fluentui/react-components";
import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    width: "100%",
    maxHeight: "100%",
    justifyContent: "space-between",
    ...Style.mixins.overflow("hidden"),
    ...Style.mixins.border(),
    ...Style.mixins.borderRadius(Style.tokens.borderRadius.md),
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
    height: "100%",
  },

  cell: {
    ...Style.mixins.paddingHorizontal("0px"),
    ...Style.mixins.overflow("hidden"),
    // ...Style.mixins.center(),

    "&.align-left": {
      textAlign: "left",
    },
    "&.align-center": {
      textAlign: "center",
      [`& .${tableHeaderCellClassNames.button}`]: {
        justifyContent: "center",
      },
    },
    "&.align-right": {
      textAlign: "right",
    },

    [`& .${tableHeaderCellClassNames.button}`]: {
      textAlign: "inherit",
    },
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
