import { useArgs } from "@storybook/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { Box, Sidebar, Toolbar } from "@tntfx/components";
import { InlineContent, TextContent, Wrapper } from "../components";

const meta: Meta<typeof Sidebar> = {
  title: "menu/Sidebar",
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    open: true,
  },
  render: function Render(props) {
    const [{ open }, setArgs] = useArgs();

    return (
      <Wrapper>
        <Toolbar icon="PanelLeft" onIconClick={() => setArgs({ isOpen: !open })}></Toolbar>
        <Box horizontal>
          <Sidebar {...props} onOpenChange={() => setArgs({ open: false })}>
            <InlineContent />
          </Sidebar>
          <TextContent />
        </Box>
      </Wrapper>
    );
  },
};
