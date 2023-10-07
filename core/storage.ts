import type { Any, Nullable, OBJECT } from "./types";
import { isClient, isServer } from "./utils/etc";
import { deserialize, serialize } from "./utils/string";

export class MemoryStorage {
  #storage: OBJECT = {};

  get length() {
    return Object.keys(this.#storage).length;
  }

  setItem<T>(key: string, value: T) {
    this.#storage[key] = value;
  }

  getItem<T>(key: string): Nullable<T> {
    return (this.#storage[key] as T) || null;
  }

  removeItem(key: string) {
    this.#storage[key] = undefined;
  }

  clear(): void {
    this.#storage = {};
  }

  get store() {
    return this.#storage;
  }
}

export class LocalStorage {
  #storage: Storage = localStorage;

  get length() {
    return localStorage.length;
  }

  setItem<T>(key: string, value: T) {
    this.#storage.setItem(key, serialize(value));
  }

  getItem<T>(key: string): Nullable<T> {
    const item = this.#storage.getItem(key);

    if (!item) {
      return null;
    }

    try {
      return deserialize<T>(item);
    } catch {
      return item as unknown as T;
    }
  }

  removeItem(key: string) {
    this.#storage.removeItem(key);
  }

  clear(): void {
    this.#storage.clear();
  }
}

type TierStorageConfig = {
  throttle?: number;
};
export class TierStorage {
  #timer: Any;
  #throttle = 500;
  #memory: MemoryStorage = new MemoryStorage();
  #persist: Nullable<LocalStorage> = isServer() ? null : new LocalStorage();

  constructor(config?: TierStorageConfig) {
    if (config?.throttle) {
      this.#throttle = config.throttle;
    }
  }

  #setTimer() {
    clearTimeout(this.#timer);
    this.#timer = setTimeout(this.#saveToPersistStore, this.#throttle);
  }

  #saveToPersistStore = () => {
    if (this.#persist) {
      for (const [key, value] of Object.entries(this.#memory.store)) {
        this.#persist.setItem(key, value);
      }
    }
  };

  setItem(key: string, value: Any) {
    this.#memory.setItem(key, value);
    this.#setTimer();
  }

  getItem<T>(key: string): Nullable<T> {
    let item: Any<T> = this.#memory.getItem(key);

    if (item) {
      return item;
    }

    if (isClient()) {
      item = this.#persist?.getItem(key);

      if (item) {
        this.#memory.setItem(key, item);

        return item;
      }
    }

    return null;
  }

  removeItem(key: string) {
    this.#memory.removeItem(key);
    this.#setTimer();
  }
}
