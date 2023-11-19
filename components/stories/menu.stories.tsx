import { useArgs } from "@storybook/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { genOptions, Wrapper } from "./utils";
import { Spacer, Text } from "../src";
import { Menu } from "../src/menu/menu";

const meta: Meta<typeof Menu> = {
  title: "menu/Menu",
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Story: Story = {
  args: {
    items: genOptions(),
    selectedItem: "home",
  },
  render: function Render(props) {
    const [, setArgs] = useArgs();

    return (
      <Wrapper>
        <Menu {...props} onClick={(id) => setArgs({ selectedItem: id })} />
      </Wrapper>
    );
  },
};

export const NestedMenu: Story = {
  args: {
    items: genOptions("", true),
    selectedItem: "home",
  },
  render: function Render(props) {
    const [{ selectedItem }, setArgs] = useArgs();

    return (
      <Wrapper>
        <Menu {...props} onClick={(id) => setArgs({ selectedItem: id })} />

        <Spacer size="xl" />
        <Text color="primary" textAlign="center" title="Selected Item">
          {selectedItem}
        </Text>
      </Wrapper>
    );
  },
};
