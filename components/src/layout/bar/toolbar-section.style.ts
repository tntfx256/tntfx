import { Style } from "@tntfx/theme";

export const useStyle = Style.create({
  root: {
    ...Style.mixins.row(),
    // overflow: visible;
    // height: 100%;
    // max-height: theme.$elementHeight-xl;
  },

  // .svg {
  //   width: theme.$size-md;
  //   height: theme.$size-md;
  // }

  // .icon {
  //   padding: theme.$spacing-sm;
  // }

  // .button:not(.icon) {
  //   min-width: theme.$elementWidth-md;
  //   margin: theme.$spacing-sm;
  // }

  // .formElement {
  //   flex: 1;
  //   margin: 0;
  // }
});
