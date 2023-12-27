import { useCallback, useState } from "react";

export { useAsync, useConst } from "@fluentui/react-hooks";

type IsStatus<T extends string> = `is${Capitalize<T>}`;
type WithExtraMethods<T extends string> = { [key in IsStatus<T>]: boolean };
type UseStatusResult<T extends string> = WithExtraMethods<T> & {
  status: T;
  setStatus: (status: T) => void;
};

export function useStatus<T extends string = string>(statuses: readonly T[]): UseStatusResult<T> {
  const [status, setStatus] = useState<T>(statuses[0]);

  return {
    setStatus,
    status,
    ...(statuses.reduce((m, s) => ({ ...m, [`is${s}`]: s === status }), {}) as WithExtraMethods<T>),
  };
}

export function useToggle(initialState = false) {
  const [status, setStatus] = useState<boolean>(initialState);

  const turnOn = useCallback(() => setStatus(true), []);
  const turnOff = useCallback(() => setStatus(false), []);
  const toggle = useCallback(() => setStatus((s) => !s), []);

  return [status, turnOn, turnOff, toggle] as const;
}
