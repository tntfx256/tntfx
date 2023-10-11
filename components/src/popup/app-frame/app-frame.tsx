import type { Container } from "@tntfx/core";
import { useAppManager } from "./app-manager";
import type { FrameProps } from "../../layout/frame/frame";
import { Frame } from "../../layout/frame/frame";

export interface AppFrameProps extends Omit<FrameProps, "onChange" | keyof Container> {
  container: Container;
}

export function AppFrame(props: AppFrameProps) {
  const { container, ...frameProps } = props;
  const manager = useAppManager();

  return <Frame {...frameProps} {...container} onChange={manager.onChange} />;
}
