import type { PropsWithChildren, ReactElement } from "react";
import type { Queries, queries, RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { Any } from "@tntfx/core";

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

function customRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(ui: ReactElement, options?: Omit<RenderOptions, "queries">) {
  return render(ui as Any, { wrapper: AllTheProviders, ...options });
}

export * from "@testing-library/react";

export { customRender as render };
