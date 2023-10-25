import { useEffect, useState } from "react";
import { isServer } from "@tntfx/core";

export function useColorScheme() {
  const [isDark, setIsDark] = useState(() => {
    if (isServer()) {
      return false;
    }
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches;
  });

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    function mqListener(e: MediaQueryListEvent) {
      setIsDark(e.matches);
    }

    darkThemeMq.addEventListener("change", mqListener);

    return () => darkThemeMq.removeEventListener("change", mqListener);
  }, []);

  return isDark;
}
