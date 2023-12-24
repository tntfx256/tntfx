import type { Option, Props, StringKeys, TObject } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import type { useHistory } from "../hooks";

export type ContentMap = TObject<{ icon?: IconName; title: string; content: string }>;

export interface WebViewProps<T extends ContentMap = ContentMap, K extends StringKeys<T> = StringKeys<T>> extends Props {
  startPage: K;
  content: ContentMap;
  domain: string;
  isMenuVisible?: boolean;
}

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
