import type { PropsWithChildren } from "react";
import type { Dimension } from "@tntfx/core";
import { initStore } from "../../hooks";

type DialogContext = {
  dimension?: Dimension;
};

const { StoreProvider, useStore } = initStore<DialogContext>({ name: "frame" });

export function DialogProvider(props: PropsWithChildren<DialogContext>) {
  return <StoreProvider dimension={props.dimension}>{props.children}</StoreProvider>;
}

export function useFrame() {
  return useStore();
}
