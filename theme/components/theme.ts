import type { Theme } from "@tntfx/theme/components/types";
import "../styles/base/index.scss";
import moduleVars from "../styles/export.module.scss";

const vars: any = moduleVars;

export const theme: Theme = {
  breakpoint: {
    xxs: +vars.breakpoint_xxs,
    xs: +vars.breakpoint_xs,
    sm: +vars.breakpoint_sm,
    md: +vars.breakpoint_md,
    lg: +vars.breakpoint_lg,
    xl: +vars.breakpoint_xl,
    xxl: +vars.breakpoint_xxl,
  },

  fontFamily: vars.font_family,
  fontFamilyMono: vars.font_family_mono,
  fontSize: {
    xxs: vars.font_size_xxs,
    xs: vars.font_size_xs,
    sm: vars.font_size_sm,
    md: vars.font_size_md,
    lg: vars.font_size_lg,
    xl: vars.font_size_xl,
    xxl: vars.font_size_xxl,
    xxxl: vars.font_size_xxxl,
  },
  lineHeight: {
    xxs: vars.line_height_xxs,
    xs: vars.line_height_xs,
    sm: vars.line_height_sm,
    md: vars.line_height_md,
    lg: vars.line_height_lg,
    xl: vars.line_height_xl,
    xxl: vars.line_height_xxl,
    xxxl: vars.line_height_xxxl,
  },
  fontWeight: {
    xxs: +vars.font_weight_xxs,
    xs: +vars.font_weight_xs,
    sm: +vars.font_weight_sm,
    md: +vars.font_weight_md,
    lg: +vars.font_weight_lg,
    xl: +vars.font_weight_xl,
    xxl: +vars.font_weight_xxl,
    xxxl: +vars.font_weight_xxxl,
  },

  palette: {
    text: vars.color_text,
    textAlt: vars.color_text_alt,
    //
    primary: vars.color_primary,
    primaryText: vars.color_primary_text,
    secondary: vars.color_secondary,
    secondaryText: vars.color_secondary_text,

    info: vars.color_info,
    infoText: vars.color_info_text,
    success: vars.color_success,
    successText: vars.color_success_text,
    warning: vars.color_warning,
    warningText: vars.color_warning_text,
    error: vars.color_error,
    errorText: vars.color_error_text,

    border: vars.color_border,
    body: vars.color_body,
    bodyText: vars.color_body_text,
    surface: vars.color_surface,
    surfaceText: vars.color_surface_text,
    surfaceAlt: vars.color_surface,
    surfaceAltText: vars.color_surface_text,
    element: vars.color_element,
    elementText: vars.color_element_text,
    elementAlpha: vars.color_element,
    elementAlphaText: vars.color_element_text,
    elementAlt: vars.color_element_alt,
    elementAltText: vars.color_element_alt_text,
    backdrop: vars.color_backdrop,

    selected: vars.color_selected,
    selectedText: vars.color_selected_text,
    hover: vars.color_hover,
    hoverText: vars.color_hover_text,
    activeText: vars.color_active_text,
  },

  shadow: {
    xs: vars.shadow_xs,
    sm: vars.shadow_sm,
    md: vars.shadow_md,
    lg: vars.shadow_lg,
    xl: vars.shadow_xl,
    xxl: vars.shadow_xxl,
  },

  size: {
    xs: vars.size_xs,
    sm: vars.size_sm,
    md: vars.size_md,
    lg: vars.size_lg,
    xl: vars.size_xl,
    xxl: vars.size_xxl,
    xxxl: vars.size_xxxl,
  },

  spacing: {
    xs: vars.spacing_xs,
    sm: vars.spacing_sm,
    md: vars.spacing_md,
    lg: vars.spacing_lg,
    xl: vars.spacing_xl,
    xxl: vars.spacing_xxl,
    xxxl: vars.spacing_xxxl,
  },

  elementWidth: {
    xs: vars.element_width_xs,
    sm: vars.element_width_sm,
    md: vars.element_width_md,
    lg: vars.element_width_lg,
    xl: vars.element_width_xl,
    xxl: vars.element_width_xxl,
    xxxl: vars.element_width_xxxl,
  },

  elementHeight: {
    xs: vars.element_height_xs,
    sm: vars.element_height_sm,
    md: vars.element_height_md,
    lg: vars.element_height_lg,
    xl: vars.element_height_xl,
    xxl: vars.element_height_xxl,
  },

  borderRadius: {
    xs: vars.border_radius_xs,
    sm: vars.border_radius_sm,
    md: vars.border_radius_md,
    lg: vars.border_radius_lg,
    xl: vars.border_radius_xl,
    xxl: vars.border_radius_xxl,
    xxxl: vars.border_radius_xxxl,
  },

  layer: {
    base: +vars.layer_base,
    window: +vars.layer_window,
    windowActive: +vars.layer_window_active,
    element: +vars.layer_element,
    sidebar: +vars.layer_sidebar,
    modal: +vars.layer_modal,
    popup: +vars.layer_popup,
    dropdown: +vars.layer_dropdown,
    toast: +vars.layer_toast,
    contextMenu: +vars.layer_context_menu,
  },
};
