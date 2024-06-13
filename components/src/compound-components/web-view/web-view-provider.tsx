import type { PropsWithChildren } from "react";
import { useState } from "react";
import type { Option } from "@tntfx/core";
import { createStore, useHistory } from "@tntfx/hooks";
import type { WebViewContext, WebViewProviderProps } from "./types";

const { StoreProvider, useStore } = createStore<WebViewContext>({ name: "webView" });

export function WebViewProvider(props: PropsWithChildren<WebViewProviderProps>) {
  const { children, content, startPage, domain, isMenuVisible } = props;

  const [links] = useState<Option[]>(() => Object.entries(content).map(([link, { title }]) => ({ id: link, title })));
  const initPage = startPage || links[0].id;

  const history = useHistory(initPage);

  return (
    <StoreProvider
      activeContent={content[links[0].id].content}
      content={content}
      domain={domain}
      history={history}
      isMenuVisible={!!isMenuVisible}
      links={links}
    >
      {children}
    </StoreProvider>
  );
}

export function useWebView() {
  const [state, setState] = useStore();
  const { content, history } = state;

  function handleMenuToggle() {
    setState((s) => {
      s.isMenuVisible = !s.isMenuVisible;
    });
  }

  function handleLinkClick(link: string) {
    history.goTo(link);
  }

  return {
    ...state,
    history,
    activeContent: content[history.activeItem].content,
    onToggleMenu: handleMenuToggle,
    onLinkClick: handleLinkClick,
  };
}
