// const AllTheProviders = ({ children }: PropsWithChildren) => {
//   return <>{children}</>;
// };

// function customRender<
//   Q extends Queries = typeof queries,
//   Container extends Element | DocumentFragment = HTMLElement,
//   BaseElement extends Element | DocumentFragment = Container,
// >(ui: ReactElement, options?: Omit<RenderOptions, "queries">) {
//   return render(ui, { wrapper: AllTheProviders, ...options });
// }

export * from "@testing-library/react";
