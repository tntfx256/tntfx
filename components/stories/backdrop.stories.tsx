import { type Meta, type StoryObj } from "@storybook/react";
import { InlineContent, TextContent, Wrapper } from "./utils";
import { Backdrop } from "../src/backdrop";

const meta: Meta<typeof Backdrop> = {
  title: "Backdrop",
  component: Backdrop,
};

export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Story: Story = {
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
