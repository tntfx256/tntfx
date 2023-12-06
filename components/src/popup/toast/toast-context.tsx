import type { PropsWithChildren } from "react";
import { initStore } from "@tntfx/hooks";
import { Toast } from "./toast";
import type { ToastPayload } from "../types";

type ToastState = {
  toasts: ToastPayload[];
};
const initialState: ToastState = {
  toasts: [],
};
const { StoreProvider, useStore } = initStore<ToastState>({ name: "toast" });

export function ToastProvider(props: PropsWithChildren) {
  return (
    <StoreProvider {...initialState}>
      {props.children}
      <ToastContainer />
    </StoreProvider>
  );
}

function ToastContainer() {
  const [{ toasts }] = useStore();

  return (
    <div className="toast-container">
      {toasts.map((props) => (
        <Toast key={props.id} {...props} />
      ))}
    </div>
  );
}

export { useStore };
