import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";

type App = {
  id: string;
  isActive?: boolean;
};

type Runtime = {
  activate(id: string): void;
  isActive(id: string): boolean;
  isOpen(id: string): boolean;
  open(id: string): void;
  close(id: string): void;
};

const runtime = createContext<Runtime>({
  activate: () => {},
  isActive: () => false,
  isOpen: () => false,
  open: () => 0,
  close: () => 0,
});

export function Runtime({ children }: PropsWithChildren) {
  const [apps, setApps] = useState<App[]>([]);

  const isActive = useCallback(
    (id: string) => {
      return apps.find((app) => app.id === id)?.isActive ?? false;
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

  const open = useCallback((id: string) => {
    const app = { id, isActive: true };
    setApps((apps) => [...apps.map((app) => ({ ...app, isActive: false })), app]);
  }, []);

  const close = useCallback((id: string) => {
    setApps((apps) => apps.filter((app) => app.id !== id));
  }, []);

  return <runtime.Provider value={{ activate, isActive, isOpen, open, close }}>{children}</runtime.Provider>;
}

export const useRuntime = () => useContext(runtime);

function comparator(a: App, b: App) {
  return a.id === b.id;
}
