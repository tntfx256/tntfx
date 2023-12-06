import { useArgs } from "@storybook/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { DateInput } from "@tntfx/components";
import { Wrapper } from "../components";

const meta: Meta<typeof DateInput> = {
  title: "from/DateInput",
  component: DateInput,
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {
    name: "date",
    label: "Birthdate",
  },
  render: function Render(props) {
    const [, setArgs] = useArgs();
    return (
      <Wrapper style={{ maxWidth: "360px" }}>
        <DateInput {...props} />
      </Wrapper>
    );
  },
};
