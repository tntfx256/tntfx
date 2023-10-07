import { useEffect, useRef, useState } from "react";
import type { Nullable } from "@tntfx/core";

interface FrameDimensions {
  headerHeight: number;
  footerHeight: number;
}

export function useFrameDimensions(frame: Nullable<HTMLDivElement>) {
  const headerRef = useRef<Nullable<HTMLDivElement>>(null);
  const footerRef = useRef<Nullable<HTMLDivElement>>(null);

  const [dimensions, setDimensions] = useState({ headerHeight: 0, footerHeight: 0 });

  useEffect(() => {
    if (!frame) {
      return;
    }

    function getDimensions() {
      const dimensions: FrameDimensions = { headerHeight: 0, footerHeight: 0 };
      if (headerRef.current) {
        const newHeight = headerRef.current.clientHeight;
        dimensions.headerHeight = newHeight;
      }
      if (footerRef.current) {
        const newHeight = footerRef.current.clientHeight;
        dimensions.footerHeight = newHeight;
      }

      setDimensions(dimensions);
    }

    const observer = new MutationObserver(getDimensions);
    const header = frame.querySelector<HTMLDivElement>(".frame-header");
    if (header) {
      headerRef.current = header;
      observer.observe(header, { childList: true });
    }

    const footer = frame.querySelector<HTMLDivElement>(".frame-footer");
    if (footer) {
      footerRef.current = footer;
      observer.observe(footer, { childList: true });
    }
    getDimensions();

    return () => {
      observer.disconnect();
    };
  }, [frame]);

  return dimensions;
}
