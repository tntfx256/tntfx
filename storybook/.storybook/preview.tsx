import React from "react";
import { type Preview } from "@storybook/react";
import { accents, variants } from "@tntfx/core";
import { ThemeProvider } from "@tntfx/theme";
import "./preview.scss";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      options: variants,
      mapping: variants.reduce((acc, variant) => ({ ...acc, [variant]: variant }), {}),
    },
    color: {
      options: accents,
      mapping: accents.reduce((acc, accent) => ({ ...acc, [accent]: accent }), {}),
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
