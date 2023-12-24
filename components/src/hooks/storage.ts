import { isClient, LocalStorage, MemoryStorage } from "@tntfx/core";

export const storage = isClient() ? new LocalStorage() : new MemoryStorage();
