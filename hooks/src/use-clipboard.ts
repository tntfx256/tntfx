import { useState } from "react";
import type { Entity, Nullable } from "@tntfx/core";

type ClipboardData = {
  type: "copy" | "cut";
  entity: Entity;
};

export function useClipboard() {
  const [clipboard, setClipboardData] = useState<ClipboardData[]>([]);

  function push(entity: Entity, type: ClipboardData["type"]) {
    const existing = clipboard.findIndex((data) => data.entity == entity);
    if (existing >= 0) {
      clipboard.splice(existing, 1);
    }

    setClipboardData([...clipboard, { entity, type }]);
  }

  function pop(): Nullable<ClipboardData> {
    const entity = clipboard.pop();
    if (entity) {
      setClipboardData([...clipboard]);
    }
    return entity || null;
  }

  function peak() {
    return clipboard[clipboard.length - 1] || null;
  }

  return { peak, pop, push };
}
