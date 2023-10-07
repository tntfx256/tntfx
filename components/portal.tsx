import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { isClient } from "@tntfx/core";

export const GLOBAL_PORTAL_ID = "root-portal";

export type PortalProps = {
  id?: string;
};

export function Portal(props: PropsWithChildren<PortalProps>) {
  const { children, id = GLOBAL_PORTAL_ID } = props;

  if (isClient()) {
    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      container.setAttribute("id", id);
    }

    container.className = "portal";

    return createPortal(<>{children}</>, container, id);
  }

  return (
    <div className="portal" id={id}>
      {children}
    </div>
  );
}
