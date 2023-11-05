import type { PropsWithChildren, ReactNode } from "react";
import { createContext, useCallback, useContext, useId, useLayoutEffect, useRef } from "react";
import type { Any, TObject } from "@tntfx/core";
import { useRender, useToggle } from "@tntfx/hooks";

type SlotProps<T> = PropsWithChildren<{ name: T }>;
type SlotComponent<T> = React.FunctionComponent<SlotProps<T>>;
type InternalState<N extends string> = {
  slotIds: Record<N, Set<string>>;
  slotComponents: Record<N, Map<string, ReactNode>>;
};

export type SlotContext<T extends string> = {
  addSlot: (name: T, id: string, children: ReactNode) => void;
  getSlot: (name: T) => ReactNode;
  removeSlot: (name: T, id: string) => void;
  context: TObject;
};

export function createSlots<T extends string>(name: string, slots: ReadonlyArray<T>) {
  type N = (typeof slots)[number];

  const slotContext = createContext<SlotContext<N>>({
    addSlot: () => null,
    getSlot: () => null,
    removeSlot: () => null,
    context: {},
  });
  slotContext.displayName = `${name}Context`;

  const initialCollection: InternalState<N> = {
    slotIds: slots.reduce((collection, name) => ({ ...collection, [name]: new Set() }), {} as Any),
    slotComponents: slots.reduce((collection, name) => ({ ...collection, [name]: new Map() }), {} as Any),
  };

  const defaultContext = Object.freeze({});

  function SlotProvider(props: PropsWithChildren<{ context?: Any }>) {
    const { context = defaultContext } = props;

    const render = useRender();
    const [isMounted, setHasMounted] = useToggle();

    const collection = useRef(initialCollection);

    const addSlot = useCallback(
      (name: N, id: string, children: ReactNode) => {
        const { slotComponents, slotIds } = collection.current;

        console.log("adding slot", name, id);

        if (!slotIds[name].has(id)) {
          slotIds[name].add(id);
          slotComponents[name].set(id, children);
          if (isMounted) {
            console.log("RERENDER");
            render();
          }
        }
      },
      [isMounted, render]
    );

    const removeSlot = useCallback((name: N, id: string) => {
      const { slotComponents, slotIds } = collection.current;

      console.log("removing slot", name, id);
      slotIds[name].delete(id);
      slotComponents[name].delete(id);
      // render();
    }, []);

    const getSlot = useCallback((name: N) => {
      const { slotComponents, slotIds } = collection.current;

      const children: ReactNode[] = [];
      slotIds[name].forEach((id) => {
        children.push(slotComponents[name].get(id));
      });
      return children;
    }, []);

    useLayoutEffect(() => {
      console.log("Mounted");
      setHasMounted();
    }, [setHasMounted]);

    return <slotContext.Provider value={{ getSlot, addSlot, removeSlot, context }}>{props.children}</slotContext.Provider>;
  }

  function Slot(props: SlotProps<T>) {
    const { name, children } = props;
    const id = useId();
    const { addSlot, removeSlot } = useContext(slotContext);

    useLayoutEffect(() => {
      addSlot(name, id, children);

      return () => removeSlot(name, id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, name]);

    return null;
  }

  function useSlot(): SlotContext<N> & { Slot: SlotComponent<N> } {
    const context = useContext(slotContext);

    return { ...context, Slot };
  }

  return { Slot, SlotProvider, useSlot };
}
