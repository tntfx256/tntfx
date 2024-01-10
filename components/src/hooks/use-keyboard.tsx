import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect } from "react";
import type { Any } from "@tntfx/core";

export type KeyboardMeta = "alt" | "ctrl" | "meta" | "shift";

type ShortcutHandler = (e: KeyboardEvent) => Any<boolean>;
type KeyboardShortcutEntry = { id: string; handler: ShortcutHandler };

class Keyboard {
  #isInitiated = false;
  #registry: KeyboardShortcutEntry[] = [];

  init() {
    if (!this.#isInitiated) {
      window.addEventListener("keydown", this.#handleKeyPress, false);
    }
  }

  destroy() {
    window.removeEventListener("keydown", this.#handleKeyPress);
  }

  register(id: string, handler: ShortcutHandler) {
    // check if it exists
    const newEntry: KeyboardShortcutEntry = { handler, id };
    const existingId = this.#registry.findIndex((entry) => id == entry.id);
    if (existingId >= 0) {
      this.#registry.splice(existingId, 1);
    }
    // add to end
    this.#registry.push(newEntry);
  }

  remove(name: string) {
    this.#registry = this.#registry.filter(({ id }) => id !== name);
  }

  #handleKeyPress = (e: KeyboardEvent) => {
    for (let i = this.#registry.length - 1; i >= 0; -i) {
      const result = this.#registry[i].handler(e);
      if (result === false) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    }
  };
}

const keyboard = new Keyboard();

type KeyboardContext = {
  keyboard: Keyboard;
};

const keyboardContext = createContext<KeyboardContext>({ keyboard });
keyboardContext.displayName = "keyboardProvider";

export function KeyboardProvider(props: PropsWithChildren) {
  useEffect(() => {
    keyboard.init();

    return () => {
      keyboard.destroy();
    };
  }, []);

  return <keyboardContext.Provider value={{ keyboard }}>{props.children}</keyboardContext.Provider>;
}

export function useKeyboard() {
  return useContext(keyboardContext);
}
