import { type Meta, type StoryObj } from "@storybook/react";
import { Button } from "@tntfx/components";
import { Wrapper } from "../components";

const meta: Meta<typeof Button> = {
  title: "general/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    title: "Button content",
  },
  render: (props) => (
    <Wrapper horizontal>
      <Button {...props} />
    </Wrapper>
  ),
};