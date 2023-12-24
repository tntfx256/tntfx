import type { PropsWithChildren } from "react";
import { Toast } from "./toast";
import { initStore } from "../../hooks";
import { GLOBAL_PORTAL_ID } from "../../portal";
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
    <div className="toast-container" id={GLOBAL_PORTAL_ID}>
      {toasts.map((props) => (
        <Toast key={props.id} {...props} />
      ))}
    </div>
  );
}

export { useStore };
