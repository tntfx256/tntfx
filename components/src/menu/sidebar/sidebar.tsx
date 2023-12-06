import type { ReactNode } from "react";
import type { DrawerProps } from "@fluentui/react-components";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerHeaderTitle } from "@fluentui/react-components";
import { memoize } from "@tntfx/core";

export type SidebarProps = DrawerProps & {
  slots?: { header?: ReactNode; footer?: ReactNode };
};

export const Sidebar = memoize(function Sidebar(props: SidebarProps) {
  const { children, slots = {}, ...libProps } = props;

  return (
    <Drawer {...libProps}>
      <DrawerHeader>
        <DrawerHeaderTitle
        // action={<Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} onClick={onClose} />}
        >
          {slots.header}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>{children}</DrawerBody>

      <DrawerFooter>{slots.footer}</DrawerFooter>
    </Drawer>
  );
});
