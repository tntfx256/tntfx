import { useCallback, useMemo, useRef, useState } from "react";
import type { Any, ERROR, SerializableError, Status } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import { useStateReducer } from "./use-reducer";

export const asyncStatus = ["Idle", "Loading", "Success", "Error"] as const;
export type AsyncStatus = (typeof asyncStatus)[number];

type IsStatus<T extends string> = `is${Capitalize<T>}`;
type WithExtraMethods<T extends string> = { [key in IsStatus<T>]: boolean };
type UseStatusResult<T extends string> = WithExtraMethods<T> & {
  status: T;
  setStatus: (status: T) => void;
};

export type OperationIdle = { isLoading: false; error: null; data: null };
export type OperationLoading = { isLoading: true; error: null; data: null };
export type OperationSuccess<T = Any> = { isLoading: false; data: T; error: null };
export type OperationError = { isLoading: false; data: null; error: SerializableError };
export type AsyncOperation<T = Any> = OperationIdle | OperationLoading | OperationSuccess<T> | OperationError;

export function useStatus<T extends string>(statuses: readonly (T & string)[]): UseStatusResult<T> {
  const [status, setStatus] = useState<T>(statuses[0]);

  return useMemo(
    () => ({
      setStatus,
      status,
      ...(statuses.reduce((m, s) => ({ ...m, [`is${s}`]: s === status }), {}) as WithExtraMethods<T>),
    }),
    [status, statuses]
  );
}

export function useAsyncStatus() {
  return useStatus<Status>(asyncStatus);
}

export function useToggle(initialState = false): [status: boolean, ...rest: Array<() => void>] {
  const [status, setStatus] = useState<boolean>(initialState);

  const turnOn = useCallback(() => setStatus(true), []);
  const turnOff = useCallback(() => setStatus(false), []);
  const toggle = useCallback(() => setStatus((s) => !s), []);

  return [status, turnOn, turnOff, toggle];
}

export function useStatusRef<T extends string>(statuses: readonly (T & string)[]) {
  const ref = useRef<T>(statuses[0]);

  return useMemo(
    () => ({
      is: (value: T) => {
        return ref.current == value;
      },
      get: () => ref.current,
      set: (status: T) => {
        ref.current = status;
      },
    }),
    []
  );
}

export function useAsyncOperation<T>() {
  const [state, setState] = useStateReducer<AsyncOperation<T>>(createInitialState);

  const setLoading = useCallback(() => {
    setState({ isLoading: true });
  }, [setState]);

  const setError = useCallback(
    (error: ERROR) => {
      setState(createErrorState(error));
    },
    [setState]
  );

  const setSuccess = useCallback(
    (data: T) => {
      setState(createSuccessState(data));
    },
    [setState]
  );

  return {
    ...state,
    isIdle: isIdleState(state),
    isError: isErrorState(state),
    isSuccess: isSuccessState(state),
    setLoading,
    setError,
    setSuccess,
  };
}

export function createInitialState(): AsyncOperation {
  return { isLoading: false, data: null, error: null };
}
export function isIdleState(operation: AsyncOperation): operation is OperationIdle {
  return operation && !operation.isLoading && !operation.data && !operation.error;
}

export function createErrorState(error: ERROR): AsyncOperation {
  return { isLoading: false, data: null, error: finalizeError(error) };
}
export function isErrorState(operation: AsyncOperation): operation is OperationError {
  return Boolean(operation && !operation.isLoading && operation.error);
}

export function createSuccessState<T>(data: T): AsyncOperation<T> {
  return { data: data, error: null, isLoading: false };
}
export function isSuccessState<T = Any>(operation: AsyncOperation<T>): operation is OperationSuccess<T> {
  return Boolean(operation && !operation.isLoading && !operation.error && operation.data);
}
