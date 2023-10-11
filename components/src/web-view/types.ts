import type { IconName, OBJECT, Option, StringKeys } from "@tntfx/core";
import type { useHistory } from "@tntfx/hooks";

export type ContentMap = OBJECT<{ icon?: IconName; title: string; content: string }>;

export type WebViewProps<T extends ContentMap = ContentMap, K extends StringKeys<T> = StringKeys<T>> = {
  startPage: K;
  content: ContentMap;
  domain: string;
  isMenuVisible?: boolean;
};

export type WebViewContext<T extends ContentMap = ContentMap, K extends StringKeys<T> = StringKeys<T>> = {
  content: T;
  links: Option<K>[];
  isMenuVisible: boolean;
  domain: string;
  activeContent: string;
  history: ReturnType<typeof useHistory>;
};

export type WebViewProviderProps = WebViewProps & {
  onToggleMenu?: () => void;
};
