import { useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Button, Menu } from "@tntfx/components";
import { useRefState, useToggle } from "@tntfx/hooks";
import { genOptions, Section, ViewValue, Wrapper } from "../components";

const meta: Meta<typeof Menu> = {
  title: "menu/Menu",
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  // args: {
  //   items: genOptions("", true),
  //   selectedItem: "home",
  // },
  // decorators: [
  //   (Story) => (
  //     <StoreProvider>
  //       <Story />
  //     </StoreProvider>
  //   ),
  // ],
  render: function Render() {
    return (
      <Wrapper>
        {/* <Section title="Vertical menu (staticInline)">
          <Menu {...props} horizontal={false} menuType="staticInline" onClickItem={onClickItem} />
        </Section>

        <Section title="Vertical menu (static)">
          <Menu {...props} horizontal={false} menuType="static" onClickItem={onClickItem} />
        </Section>

        <Section title="Horizontal menu">
          <Menu {...props} horizontal srcElement={ref.current} onClickItem={onClickItem} />
        </Section> */}

        <ContextMenuStory />

        {/* <Section title="Dropdown Menu">
          <ContextMenu {...props} dropdown onClick={onClickItem}>
            <Button>Menu</Button>
          </ContextMenu>
        </Section> */}
      </Wrapper>
    );
  },
};

const items = genOptions("", true);

function ContextMenuStory() {
  const [selectedItem, setSelectedItem] = useState("");

  const [isOpen, , hide, toggle] = useToggle();
  const [ref, refHandler] = useRefState<HTMLElement>();

  function onClickItem(id: string) {
    setSelectedItem(id);
    hide();
  }

  return (
    <Section title="Context Menu">
      <Button ref={refHandler} onClick={toggle}>
        Trigger
      </Button>

      <Menu
        isOpen={isOpen}
        items={items}
        menuType="dropdown"
        selectedItem={selectedItem}
        target={ref}
        onClick={onClickItem}
        onClose={hide}
      />

      <ViewValue value={{ selectedItem }} />
    </Section>
  );
}
