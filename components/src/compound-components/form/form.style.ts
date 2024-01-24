import { comboboxClassNames } from "@fluentui/react-components";
import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    fontFamily: "inherit",
    maxWidth: `${Style.tokens.breakpoint.sm}px`,
    // ...Style.mixins.border("2px solid red"),

    [`& .${comboboxClassNames.root}`]: {},
  },
  legend: {},
  actions: {},
});
