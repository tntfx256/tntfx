import type { PropsWithChildren, ReactElement } from "react";
import { memoize } from "@tntfx/core";
import { Dialog } from "./dialog";
import type { DialogProps } from "./types";
import { useRuntime } from "../../hooks";

export interface AppProps extends DialogProps {
  id: string;
  appIcon: ReactElement;
}

export const App = memoize(function App(props: PropsWithChildren<AppProps>) {
  const { id, draggable = true, resizable = true, appIcon, ...frameProps } = props;

  const runtime = useRuntime();

  if (!runtime.isOpen(id)) {
    return null;
  }

  return (
    <Dialog
      draggable={draggable}
      id={id}
      isActive={runtime.isActive(id)}
      modalType="non-modal"
      resizable={resizable}
      role="application"
      slots={{ trigger: appIcon }}
      onClick={() => runtime.activate(id)}
      onClose={() => runtime.close(id)}
      {...frameProps}
    />
  );
});
