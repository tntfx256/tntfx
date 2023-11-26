import { useArgs } from "@storybook/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { Toggle } from "@tntfx/components";
import { Wrapper } from "../components";

const meta: Meta<typeof Toggle> = {
  title: "from/Toggle",
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    name: "toggle",
    value: true,
    label: "toggle label",
  },
  render: function Render(props) {
    const [, setArgs] = useArgs();
    return (
      <Wrapper padding="xl" style={{ maxWidth: "360px" }}>
        <Toggle {...props} onChange={(value) => setArgs({ value })} />
      </Wrapper>
    );
  },
};
