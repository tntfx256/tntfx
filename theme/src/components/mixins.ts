import { type GriffelStyle, shorthands } from "@fluentui/react-components";
import { tokens } from "./tokens";
import { splitBorderStyle } from "./utils";

export const mixins = {
  transition(
    properties: GriffelStyle["transitionProperty"] = "all",
    duration: GriffelStyle["transitionDuration"] = tokens.animation.duration.md,
    easing: GriffelStyle["transitionTimingFunction"] = (tokens.animation.easing.linear = "ease-in-out")
  ): GriffelStyle {
    return {
      transitionProperty: properties,
      transitionTimingFunction: easing,
      transitionDuration: duration,
    };
  },
  borderRadius(size: string): GriffelStyle {
    return {
      borderTopLeftRadius: size,
      borderTopRightRadius: size,
      borderBottomRightRadius: size,
      borderBottomLeftRadius: size,
    };
  },
  border(style: string = ""): GriffelStyle {
    const [width, type, color] = splitBorderStyle(style);
    return shorthands.border(width, type, color);
  },
  borderTop(style: string = ""): GriffelStyle {
    const [width, type, color] = splitBorderStyle(style);
    return shorthands.borderTop(width, type, color);
  },
  borderBottom(style: string = ""): GriffelStyle {
    const [width, type, color] = splitBorderStyle(style);
    return shorthands.borderBottom(width, type, color);
  },
  margin(...args: GriffelStyle["marginLeft"][]): GriffelStyle {
    const [top, right = top, bottom = top, left = right] = args;
    return {
      marginTop: top,
      marginRight: right,
      marginBottom: bottom,
      marginLeft: left,
    };
  },
  marginHorizontal(...args: GriffelStyle["marginLeft"][]): GriffelStyle {
    const [left, right = left] = args;
    return {
      marginLeft: left,
      marginRight: right,
    };
  },
  marginVertical(...args: GriffelStyle["marginLeft"][]): GriffelStyle {
    const [top, bottom = top] = args;
    return {
      marginTop: top,
      marginBottom: bottom,
    };
  },
  padding(...args: GriffelStyle["paddingLeft"][]): GriffelStyle {
    const [top, right = top, bottom = top, left = right] = args;
    return {
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
    };
  },
  paddingHorizontal(...args: GriffelStyle["paddingLeft"][]): GriffelStyle {
    const [left, right = left] = args;
    return {
      paddingLeft: left,
      paddingRight: right,
    };
  },
  paddingVertical(...args: GriffelStyle["paddingLeft"][]): GriffelStyle {
    const [top, bottom = top] = args;
    return {
      paddingTop: top,
      paddingBottom: bottom,
    };
  },
  flex(...args: [number?, number?, GriffelStyle["flexBasis"]?]): GriffelStyle {
    const [grow = 0, shrink = 1, basis = "auto"] = args;
    return {
      flexGrow: grow,
      flexShrink: shrink,
      flexBasis: basis,
    };
  },
  overflow(style: GriffelStyle["overflowX"] = "auto"): GriffelStyle {
    return { overflowX: style, overflowY: style };
  },

  // gap
  // gridArea
  // inset
  // outline
  // transition
  // textDecoration

  fill(position: GriffelStyle["position"] = "absolute"): GriffelStyle {
    return {
      position,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
  },
  row(): GriffelStyle {
    return {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      whiteSpace: "nowrap",
      alignItems: "center",
    };
  },
  center(flex = true): GriffelStyle {
    return flex
      ? {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }
      : {
          textAlign: "center",
          verticalAlign: "middle",
        };
  },
};
