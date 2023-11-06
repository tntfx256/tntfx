import type { PropsWithChildren } from "react";
import { useRuntime } from "@tntfx/hooks";
import { Frame } from "./frame";
import type { FrameProps } from "./types";

type AppProps = FrameProps;

export function App(props: PropsWithChildren<AppProps>) {
  const { id, draggable = true, resizable = true, ...frameProps } = props;

  const runtime = useRuntime();

  if (!runtime.isOpen(id)) {
    return null;
  }

  return (
    <Frame
      draggable={draggable}
      id={id}
      isActive={runtime.isActive(id)}
      resizable={resizable}
      onClick={() => runtime.activate(id)}
      onClose={() => runtime.close(id)}
      {...frameProps}
    />
  );
}
