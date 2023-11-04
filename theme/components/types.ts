import { CSSProperties } from "react";

export interface Theme {
  // scheme: "light" | "dark";
  breakpoint: {
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  fontFamily: string;
  fontFamilyMono: string;
  fontSize: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  lineHeight: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fontWeight: {
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };

  palette: {
    text: string;
    textAlt: string;

    primary: string;
    primaryText: string;
    secondary: string;
    secondaryText: string;

    info: string;
    infoText: string;
    success: string;
    successText: string;
    warning: string;
    warningText: string;
    error: string;
    errorText: string;

    body: string;
    bodyText: string;
    surface: string;
    surfaceText: string;
    element: string;
    elementText: string;
    elementAlt: string;
    elementAltText: string;
  };

  shadow: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };

  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    // xxxxl: string;
  };

  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    // xxxxl: string;
  };

  elementWidth: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    // xxxxl: string;
  };

  elementHeight: {
    sm: string;
    md: string;
    footer: string;
    header: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };

  layer: {
    base: number;
    window: number;
    windowActive: number;
    element: number;
    sidebar: number;
    modal: number;
    popup: number;
    dropdown: number;
    toast: number;
    contextMenu: number;
  };
}
