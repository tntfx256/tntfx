import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import type { Any, AppEntity, Container, Nullable } from "@tntfx/core";
import { applications, calcInitialFrameDimension } from "@tntfx/core";
import { initStore } from "@tntfx/hooks";
import type { FrameEvent } from "../../layout/frame/utils";

// apps will be added by manager.lunch
// dialogs are added on the frame init event

type RuntimeState = {
  containers: Container[];
  // dialogs: Omit<Container, "entity">[];
};

const initialState: RuntimeState = {
  containers: [],
  // dialogs: [],
};

const { StoreProvider, useStore } = initStore<RuntimeState>({ name: "appManager" });

export function AppManager(props: PropsWithChildren) {
  return (
    <StoreProvider {...initialState}>
      {props.children}
      <Runtime />
    </StoreProvider>
  );
}

function Runtime() {
  const [{ containers }] = useStore();

  return (
    <div className="frame-manager">
      {containers.map((container) => {
        const Registry = applications.openWith(container.entity);
        if (Registry) {
          return <Registry.App key={container.entity.id} container={container} />;
        }
      })}
    </div>
  );
}

export function useAppManager() {
  const [{ containers }, setState] = useStore();

  return useMemo(
    () => ({
      launch<T = Any>(entity: AppEntity, input?: T) {
        setState((s) => {
          const container: Container<T> = {
            input,
            entity,
            id: entity.id,
            state: "active",
            status: "normal",
            dimension: calcInitialFrameDimension(containers.map(({ dimension }) => dimension)),
          };

          s.containers.push(container);
        });
      },
      onChange(e: FrameEvent) {
        const { id, type, parentBoundary } = e;
        const isDialog = "isDialog" in e ? e.isDialog : Boolean(parentBoundary);
        if (isDialog) return;

        switch (type) {
          case "init":
            setState((s) => {
              s.containers.forEach((c) => {
                if (c.id === id) {
                  c.dimension = calcInitialFrameDimension(
                    containers.map(({ dimension }) => dimension),
                    c.boundary,
                    e.dimension
                  );
                }
              });
            });
            break;

          case "drag":
          case "resize":
            const { dimension } = e;
            const { top, left, width, height } = dimension;
            setState((s) => {
              s.containers.forEach((c) => {
                if (c.id === id) {
                  c.dimension = { top, left, width, height };
                }
              });
            });
            break;
          case "activate":
            setState((s) => {
              s.containers.forEach((c) => {
                c.state = c.id === id ? "active" : "background";
              });
            });
            break;
          case "close":
            setState((s) => {
              s.containers = s.containers.filter((c) => c.id !== id);
            });
            break;
          case "maximize":
            setState((s) => {
              s.containers.forEach((c) => {
                c.status = c.id === id ? "maximized" : c.status;
              });
            });
            break;
          case "minimize":
            setState((s) => {
              s.containers.forEach((c) => {
                c.status = c.id === id ? (c.status === "maximized" ? "minimized_max" : "minimized") : c.status;
              });
            });
            break;
          case "restore":
            setState((s) => {
              s.containers.forEach((c) => {
                c.status = c.id === id ? (c.status === "minimized_max" ? "maximized" : "normal") : c.status;
              });
            });
            break;
        }
      },
    }),
    [containers, setState]
  );
}

export function useContainerSelector(id: string): Nullable<Container> {
  const [{ containers }] = useStore();

  return containers?.find((c) => c.id === id) || null;
}
