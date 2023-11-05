import type { PropsWithChildren } from "react";
import { useRuntime } from "@tntfx/hooks";
import { Frame } from "./frame";
import type { FrameProps } from "./types";

type AppProps = FrameProps;

export function App(props: PropsWithChildren<AppProps>) {
  const { id, ...frameProps } = props;

  const runtime = useRuntime();

  if (!runtime.isOpen(id)) {
    return null;
  }

  return (
    <Frame
      id={id}
      isActive={runtime.isActive(id)}
      onClick={() => runtime.activate(id)}
      onClose={() => runtime.close(id)}
      {...frameProps}
    />
  );
}
