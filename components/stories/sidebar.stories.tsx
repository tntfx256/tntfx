import { useArgs } from "@storybook/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { InlineContent, TextContent, Wrapper } from "./utils";
import { Box, Toolbar } from "../src";
import { Sidebar } from "../src/menu/sidebar/sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "menu/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Story: Story = {
  args: {
    isOpen: true,
  },
  render: function Render(props) {
    const [{ isOpen }, setArgs] = useArgs();

    return (
      <Wrapper>
        <Toolbar icon="sidebar" onIconClick={() => setArgs({ isOpen: !isOpen })}></Toolbar>
        <Box horizontal>
          <Sidebar {...props} onClickOutside={() => setArgs({ isOpen: false })}>
            <InlineContent />
          </Sidebar>
          <TextContent />
        </Box>
      </Wrapper>
    );
  },
};

export const WithBody: Story = {
  args: {
    isOpen: true,
    slots: {
      body: <TextContent />,
    },
  },
  render: function Render(props) {
    return (
      <Wrapper horizontal>
        <Sidebar {...props}>
          <InlineContent />
        </Sidebar>
      </Wrapper>
    );
  },
};
