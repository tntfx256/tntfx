import { useRuntime } from "@tntfx/hooks";
import { PropsWithChildren } from "react";
import { FrameProps } from "./types";
import { Frame } from "./frame";

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
      onClose={() => runtime.close(id)}
      onClick={() => runtime.activate(id)}
      {...frameProps}
    />
  );
}
