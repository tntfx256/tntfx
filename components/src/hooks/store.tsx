import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect } from "react";
import { useCompare } from "./history";
import { createPatcherAction, createResetterAction, createSetterAction, useStateReducer } from "./reducer";

export type Store<S> = ReturnType<typeof useStateReducer<S>>;

export type StoreConfig = {
  name: string;
  persist?: {
    version: string;
    throttle?: number;
  };
};

export type StoreProviderProps<S> = PropsWithChildren<S>;

export function initStore<S>(config: StoreConfig) {
  const { name, persist } = config;
  const persistReducerConfig = persist ? { persist: { name } } : undefined;

  const StoreContext = createContext<Store<S>>([{} as S, () => undefined] as Store<S>);
  StoreContext.displayName = `${name}Context`;

  const actions = createStoreActions<S>();

  function useStore() {
    return useContext(StoreContext);
  }

  function getStore(cb: (state: S, setState: ReturnType<typeof useStore>[1]) => void) {
    <StoreContext.Consumer>
      {(store) => {
        cb(store[0], store[1]);
        return null;
      }}
    </StoreContext.Consumer>;
  }

  function StoreProvider(props: StoreProviderProps<S>) {
    const { children, ...state } = props;
    const hasChanged = useCompare(state);
    const store = useStateReducer<S>(state as S, persistReducerConfig);

    useEffect(() => {
      if (hasChanged(state)) {
        store[1](state as S);
      }
    }, [hasChanged, state, store]);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
  }
  StoreProvider.displayName = `${name}Provider`;

  return { actions, getStore, useStore, StoreProvider };
}

function createStoreActions<S>() {
  return {
    set: createSetterAction<S>,
    reset: createResetterAction,
    patch: createPatcherAction<S>,
  };
}
