import type { Dispatch } from "react";
import { useEffect, useReducer, useState } from "react";
import type { Any } from "@tntfx/core";
import { TierStorage } from "@tntfx/core";
import { produce } from "immer";

const ACTION_TYPE_KEY = "$$type";

export type InitialState<S> = S | (() => S);
export type StateReducerConfig = { persist?: { name: string; throttle?: number } };

export type PatcherAction<S> = Partial<S>;
export type SetterAction<S> = { [ACTION_TYPE_KEY]: "SET"; payload: S };
export type ResetterAction = { [ACTION_TYPE_KEY]: "RESET" };
export type LegacyAction<S> = SetterAction<S> | ResetterAction;

export type ProducerAction<S> = (state: S) => Partial<S> | LegacyAction<S> | void;

export type Action<S> = ProducerAction<S> | LegacyAction<S> | Partial<S>;
export type SetState<S> = Dispatch<Action<S>>;

export function useStateReducer<S>(initialState: InitialState<S>, config?: StateReducerConfig): [S, SetState<S>] {
  const iState: S = typeof initialState === "function" ? (initialState as Any)() : initialState;

  const [storage] = useState(() => new TierStorage(config?.persist));

  const store = useReducer((state: S, action: Action<S>) => {
    const newState = produce<S, S>(state, (draftStat) => {
      // producerAction
      if (isProducerAction(action)) {
        const result = action(draftStat);
        if (result) {
          if (isLegacyAction(result)) {
            // continue with the new action
            action = result;
          } else {
            return { ...state, ...result };
          }
        } else {
          // state has been manipulated directly
          return;
        }
      }

      // legacyAction
      if (isLegacyAction(action)) {
        const actionType = action[ACTION_TYPE_KEY];
        if (actionType === "RESET") {
          return { ...iState };
        }
        if (actionType === "SET") {
          return { ...action.payload };
        }
        return;
      }

      // stateAction
      return { ...draftStat, ...action };
    });

    persistState(newState);
    return newState;
  }, iState);

  useEffect(() => {
    if (config?.persist) {
      const data = storage.getItem<S>(config.persist.name);
      if (data) {
        store[1](data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistState(state: S) {
    if (config?.persist) {
      storage.setItem(config.persist.name, state);
    }
  }

  return store;
}

export function createPatcherAction<S>(payload: Partial<S>): PatcherAction<S> {
  return { ...payload };
}
export function createSetterAction<S>(payload: S): SetterAction<S> {
  return { [ACTION_TYPE_KEY]: "SET", payload };
}
export function createResetterAction(): ResetterAction {
  return { [ACTION_TYPE_KEY]: "RESET" };
}

function isProducerAction<S = unknown>(action: Action<S>): action is ProducerAction<S> {
  return typeof action === "function";
}

function isLegacyAction<S = unknown>(action: Action<S> | Partial<S>): action is LegacyAction<S> {
  return Boolean(action) && ACTION_TYPE_KEY in action;
}
