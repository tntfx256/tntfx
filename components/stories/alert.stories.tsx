import { type Meta, type StoryObj } from "@storybook/react";
import { Alert } from "../src/alert";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Story: Story = {
  args: {
    icon: "info",
    title: "Alert Title",
    message:
      "Lorem insum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc ut nisi.",
    actions: "OkCancel",
  },
};
