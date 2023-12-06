import { tokens as fui } from "@fluentui/react-components";
import { Breakpoints } from "@tntfx/core";
import { toRem } from "./utils";

export const tokens = {
  breakpoint: Breakpoints,

  mediaQueries: {
    belowSupported: `@media screen and (max-width: ${Breakpoints.sm}px)`,
  },

  // fontFamily: vars.font_family,
  fontFamilyMono: fui.fontFamilyMonospace,
  fontSize: {
    xxxs: fui.fontSizeBase100,
    xxs: fui.fontSizeBase200,
    xs: fui.fontSizeBase300,
    sm: fui.fontSizeBase400,
    md: fui.fontSizeBase500,
    lg: fui.fontSizeBase600,
    xl: fui.fontSizeHero700,
    xxl: fui.fontSizeHero800,
    xxxl: fui.fontSizeHero900,
  },
  fontWeight: {
    sm: 200,
    md: 300,
    lg: 400,
    xl: 700,
    xxl: 900,
  },
  lineHeight: {
    xxxs: fui.lineHeightBase100,
    xxs: fui.lineHeightBase200,
    xs: fui.lineHeightBase300,
    sm: fui.lineHeightBase400,
    md: fui.lineHeightBase500,
    lg: fui.lineHeightBase600,
    xl: fui.lineHeightHero700,
    xxl: fui.lineHeightHero800,
    xxxl: fui.lineHeightHero900,
  },

  palette: {
    text: fui.colorNeutralForeground1,
    textAlt: fui.colorNeutralForegroundInverted,
    //
    primary: fui.colorBrandBackground,
    primaryText: fui.colorBrandForeground1,

    secondary: fui.colorNeutralBackground3,
    secondaryText: fui.colorNeutralForeground3,

    info: fui.colorStatusSuccessBackground1,
    infoText: fui.colorStatusSuccessForeground1,

    success: fui.colorStatusSuccessBackground2,
    successText: fui.colorStatusSuccessForeground2,

    warning: fui.colorStatusWarningBackground2,
    warningText: fui.colorStatusWarningForeground2,

    error: fui.colorStatusDangerBackground2,
    errorText: fui.colorStatusDangerForeground2,

    border: fui.colorNeutralStroke1,

    body: fui.colorNeutralBackground1,
    bodyAlpha: fui.colorNeutralBackgroundAlpha,
    surface: fui.colorNeutralBackground3,
    surfaceAlpha: fui.colorNeutralBackground3Hover,
    // element: fui.colorNeutralBackground3,
    // bodyText: fui.colorNeutralForegroundOnBrand,
    // surface: fui.color_surface,
    // surfaceText: fui.color_surface_text,
    // surfaceAlt: fui.colorNeutralBackground6,
    // surfaceAltText: fui.colorNeutralForeground1,
    // element: fui.color_element,
    // elementText: fui.color_element_text,
    // elementAlpha: fui.color_element,
    // elementAlphaText: fui.color_element_text,
    // elementAlt: fui.color_element_alt,
    // elementAltText: fui.color_element_alt_text,
    backdrop: fui.colorBackgroundOverlay,

    // selected: fui.color_selected,
    // selectedText: fui.color_selected_text,
    // hover: fui.colorSubtleBackgroundLightAlphaHover,
    // hoverText: fui.color_hover_text,
    // activeText: fui.color_active_text,
  },

  shadow: {
    xs: fui.shadow2,
    sm: fui.shadow4,
    md: fui.shadow8,
    lg: fui.shadow16,
    xl: fui.shadow28,
    xxl: fui.shadow64,
  },
  blur: {
    sm: toRem(12),
    md: toRem(16),
    lg: toRem(24),
  },

  // size: {
  //   xs: fui.size_xs,
  //   sm: fui.size_sm,
  //   // md: tokens.,
  //   lg: fui.size_lg,
  //   xl: fui.size_xl,
  //   xxl: fui.size_xxl,
  //   xxxl: fui.size_xxxl,
  // },

  spacing: {
    xxs: fui.spacingVerticalXXS,
    xs: fui.spacingVerticalXS,
    sm: fui.spacingVerticalS,
    md: fui.spacingVerticalM,
    lg: fui.spacingVerticalL,
    xl: fui.spacingVerticalXL,
    xxl: fui.spacingVerticalXXL,
    xxxl: fui.spacingVerticalXXXL,
  },

  size: {
    xxs: toRem(16),
    xs: toRem(24),
    sm: toRem(28),
    md: toRem(32),
    lg: toRem(38),
    xl: toRem(42),
    xxl: toRem(54),
  },

  borderRadius: {
    xs: fui.borderRadiusNone,
    sm: fui.borderRadiusSmall,
    md: fui.borderRadiusMedium,
    lg: fui.borderRadiusLarge,
    xl: fui.borderRadiusXLarge,
    xxl: fui.borderRadiusCircular,
  },
  strokeWidth: {
    sm: fui.strokeWidthThin,
    md: fui.strokeWidthThick,
    lg: fui.strokeWidthThicker,
    xl: fui.strokeWidthThickest,
  },

  layer: {
    base: 1,
    surface: 2,
    element: 3,
    sidebar: 4,
    modal: 5,
    popup: 6,
    dropdown: 7,
    toast: 8,
    contextMenu: 9,
  },
};
