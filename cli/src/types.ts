import type { Sizable } from "@tntfx/core";

type ColorCombo = { main: string; text: string };

export interface Theme {
  layout: {
    borderRadius: Sizable;
    spacing: Sizable;
  };

  palette: {
    primary: ColorCombo;
    secondary: ColorCombo;
    error: ColorCombo;
    info: ColorCombo;
    success: ColorCombo;
    warning: ColorCombo;
    body: ColorCombo;
    element: ColorCombo;

    border: ColorCombo;
    selected: ColorCombo;
  };
}

export type ThemeOptions = {
  palette?: {
    primary: string;
    secondary: string;

    body?: string;
    bodyAlt?: string;
    border?: string;
    element?: string;
    elementAlt?: string;
    error?: string;
    info?: string;
    success?: string;
    text?: { dark: string; light: string };
    warning?: string;

    selected?: string;
  };
};
