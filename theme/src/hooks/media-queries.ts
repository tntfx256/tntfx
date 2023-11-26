import { useEffect, useState } from "react";
import { Breakpoints } from "../utils";

export const MQ = {
  DARK_SCHEME: "(prefers-color-scheme: dark)",
  LIGHT_SCHEME: "(prefers-color-scheme: light)",
  ABOVE_MEDIUM: `(min-width: ${Breakpoints.md + 1}px)`,
  BELOW_MEDIUM: `(min-width: ${Breakpoints.md + 1}px)`,
};

export function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(() => matchMedia(query).matches);

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
