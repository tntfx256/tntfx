import type { PropsWithChildren } from "react";
import type { Dimension } from "@tntfx/core";
import { initStore } from "@tntfx/hooks";

type FrameContext = {
  dimension?: Dimension;
};

const { StoreProvider, useStore } = initStore<FrameContext>({ name: "frame" });

export function FrameProvider(props: PropsWithChildren<FrameContext>) {
  return <StoreProvider dimension={props.dimension}>{props.children}</StoreProvider>;
}

export function useFrame() {
  return useStore();
}
