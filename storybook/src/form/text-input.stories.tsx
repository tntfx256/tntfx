import { useArgs } from "@storybook/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { TextInput } from "@tntfx/components";
import { Icon } from "@tntfx/icons";
import { Wrapper } from "../components";

const meta: Meta<typeof TextInput> = {
  title: "from/TextInput",
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    name: "input",
    value: "input value",
    label: "input label",
    slots: {
      end: <Icon name="asterisk" />,
    },
  },
  render: function Render(props) {
    const [, setArgs] = useArgs();
    return (
      <Wrapper padding="xl" style={{ maxWidth: "360px" }}>
        <TextInput {...props} onChange={(value: string) => setArgs({ value })} onClear={() => setArgs({ value: "" })} />
      </Wrapper>
    );
  },
};
