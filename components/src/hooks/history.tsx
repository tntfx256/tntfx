import { useCallback, useRef, useState } from "react";
import { isEqual } from "@tntfx/core";

export { usePrevious } from "@fluentui/react-hooks";

export function useCompare<T>(value: T) {
  const ref = useRef<T>(value);

  const hasChanged = useCallback((value: T) => {
    const isChanges = !isEqual(value, ref.current);
    if (isChanges) {
      ref.current = value;
      return true;
    }
    return false;
  }, []);

  return hasChanged;
}

export function useHistory(initItem: string) {
  const history = useRef<string[]>([initItem]);
  const [index, setIndex] = useState(0);

  const canGoBack = index > 0 && index < history.current.length;
  const canGoForward = index < history.current.length - 1;

  const goTo = useCallback((item: string) => {
    history.current.push(item);
    setIndex(history.current.length - 1);
  }, []);

  const goBack = useCallback(() => {
    if (canGoBack) {
      setIndex((index) => index - 1);
    }
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      setIndex((index) => index + 1);
    }
  }, [canGoForward]);

  return {
    activeItem: history.current[index],
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    goTo,
  };
}
