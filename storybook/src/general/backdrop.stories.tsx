import { type Meta, type StoryObj } from "@storybook/react";
import { Backdrop } from "@tntfx/components";
import { InlineContent, TextContent, Wrapper } from "../components";

const meta: Meta<typeof Backdrop> = {
  title: "general/Backdrop",
  component: Backdrop,
};

export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
  args: {
    isOpen: true,
    background: "blur",
  },
  render: (props) => (
    <Wrapper>
      <TextContent />

      <Backdrop {...props}>
        <InlineContent />
      </Backdrop>
    </Wrapper>
  ),
};
