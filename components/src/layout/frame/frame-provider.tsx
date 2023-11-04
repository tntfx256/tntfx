import { Dimension } from "@tntfx/core";
import { initStore } from "@tntfx/hooks";
import { PropsWithChildren } from "react";

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
