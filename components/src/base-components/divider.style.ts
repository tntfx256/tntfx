import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {},
  transparent: {
    "&:before, &:after": {
      ...Style.mixins.border("1px solid transparent"),
    },
  },
});
