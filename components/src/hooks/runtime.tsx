import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import type { TObject } from "@tntfx/core";

type App = {
  id: string;
  isActive: boolean;
  params: TObject;
};

type Runtime = {
  activate(id: string): void;
  isActive(id: string): boolean;
  isOpen(id: string): boolean;
  open(id: string, params?: TObject): void;
  close(id: string): void;
  getParams(id: string): TObject;
};

const runtime = createContext<Runtime>({
  activate: () => {},
  isActive: () => false,
  isOpen: () => false,
  open: () => 0,
  close: () => 0,
  getParams: () => ({}),
});

export function Runtime({ children }: PropsWithChildren) {
  const [apps, setApps] = useState<App[]>([]);

  const isActive = useCallback(
    (id: string) => {
      return apps.find((app) => app.id === id)?.isActive ?? false;
    },
    [apps]
  );

  const getParams = useCallback(
    (id: string) => {
      return apps.find((app) => app.id === id)?.params ?? {};
    },
    [apps]
  );

  const isOpen = useCallback(
    (id: string) => {
      return apps.some((app) => app.id === id);
    },
    [apps]
  );

  const activate = useCallback((id: string) => {
    setApps((apps) => apps.map((app) => ({ ...app, isActive: app.id === id })));
  }, []);

  const open = useCallback((id: string, params: TObject = {}) => {
    const app = { id, isActive: true, params };

    setApps((apps) => [...apps.map((app) => ({ ...app, isActive: false })), app]);
  }, []);

  const close = useCallback((id: string) => {
    setApps((apps) => apps.filter((app) => app.id !== id));
  }, []);

  return <runtime.Provider value={{ activate, isActive, isOpen, open, close, getParams }}>{children}</runtime.Provider>;
}

export const useRuntime = () => useContext(runtime);
