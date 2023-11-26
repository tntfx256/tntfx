import { useArgs } from "@storybook/preview-api";
import { type Meta, type StoryObj } from "@storybook/react";
import { Select } from "@tntfx/components";
import type { Option } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import { Section, ViewValue, Wrapper } from "../components";

const meta: Meta<typeof Select> = {
  title: "from/Select",
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

const options: Option[] = "code comment construction contact copy cross delete desktop dir dislike down email"
  .split(" ")
  .map((word) => ({
    id: word,
    title: word,
    icon: word as IconName,
  }));

export const Default: Story = {
  args: {
    options,
    name: "default",
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();
    return (
      <Wrapper>
        <Section title="Default">
          <Select {...props} onChange={(value) => setArgs({ value })} />
          <ViewValue value={{ value }} />
        </Section>
      </Wrapper>
    );
  },
};

export const Searchable: Story = {
  args: {
    options,
    name: "search",
    multi: true,
    searchable: true,
    value: [],
  },
  render: function Render(props) {
    const [{ value }, setArgs] = useArgs();

    return (
      <Wrapper>
        <Section title="Searchable">
          <Select {...props} name="multi" options={options} onChange={(value) => setArgs({ value })} />

          <ViewValue value={{ value }} />
        </Section>
      </Wrapper>
    );
  },
};
