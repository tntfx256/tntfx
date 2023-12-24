import { type Preview } from "@storybook/react";
import { ThemeProvider } from "@tntfx/theme";
import React from "react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
