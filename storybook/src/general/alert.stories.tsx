import { type Meta, type StoryObj } from "@storybook/react";
import { Alert } from "@tntfx/components";

const meta: Meta<typeof Alert> = {
  title: "general/Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: "Alert Title",
    message: "Lorem insum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc.",
    actions: "OkCancel",
  },
};
