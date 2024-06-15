import { useEffect, useState } from "react";
import { Breakpoints, isClient } from "@tntfx/core";

export const MQ = {
  DARK_SCHEME: "@media(prefers-color-scheme: dark)",
  LIGHT_SCHEME: "@media(prefers-color-scheme: light)",
  ABOVE_MEDIUM: `@media(min-width: ${Breakpoints.md + 1}px)`,
  BELOW_MEDIUM: `@media(max-width: ${Breakpoints.md}px)`,
};

export function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(() => (isClient() ? matchMedia(query).matches : false));

  useEffect(() => {
    function handleMatchChange(e: MediaQueryListEvent) {
      setIsMatch(e.matches);
    }

    const mediaQueryList = matchMedia(query);
    mediaQueryList.addEventListener("change", handleMatchChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMatchChange);
    };
  }, [query]);

  return isMatch;
}

export const useIsDarkMode = () => useMediaQuery(MQ.DARK_SCHEME);
export const useIsAboveMedium = () => useMediaQuery(MQ.ABOVE_MEDIUM);
export const useIsBelowMedium = () => useMediaQuery(MQ.BELOW_MEDIUM);
