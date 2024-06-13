import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {},
  transparent: {
    "&:before, &:after": {
      border: "1px solid transparent",
    },
  },
});
