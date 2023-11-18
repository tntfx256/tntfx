import { type Meta, type StoryObj } from "@storybook/react";
import { variants } from "@tntfx/core";
import { Alert } from "../src/alert";

const meta: Meta<typeof Alert> = {
  component: Alert,
  argTypes: {
    color: variants,
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: "Alert",
    color: "destructive",
    variant: "outlined",
    type: "error",
  },
};
