import type { Any, TObject } from "./types";
import { now } from "./utils/date-time";

const LogTypes = ["DEBUG", "INFO", "WARN", "ERROR"] as const;
type LogType = (typeof LogTypes)[number];

export interface LoggerDriver {
  debug: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
}

export class Logger {
  static #loggers: TObject<Logger> = {};

  static getInstance(name = "main") {
    if (!Logger.#loggers[name]) {
      Logger.#loggers[name] = new Logger();
    }

    return Logger.#loggers[name];
  }

  #logLevel: LogType = "DEBUG";
  #driver: LoggerDriver = new ConsoleDriver();

  static #format(type: LogType, data: string[]) {
    return `${now().toLocaleString().padStart(18)} ${type.padStart(6)}: ${data.join(" | ")}`;
  }

  get logLevel() {
    return this.#logLevel;
  }

  set logLevel(level: LogType) {
    this.#logLevel = level;
  }

  set driver(level: LogType) {
    this.#logLevel = level;
  }

  debug(...data: Any[]) {
    this.#driver.debug(Logger.#format("DEBUG", data));
  }
  info(...data: Any[]) {
    this.#driver.info(Logger.#format("INFO", data));
  }
  error(...data: Any[]) {
    this.#driver.error(Logger.#format("ERROR", data));
  }
  warn(...data: Any[]) {
    this.#driver.warn(Logger.#format("WARN", data));
  }
}

export class ConsoleDriver implements LoggerDriver {
  debug(message: string) {
    console.debug(message);
  }
  info(message: string) {
    console.info(message);
  }
  error(message: string) {
    console.error(message);
  }
  warn(message: string) {
    console.warn(message);
  }
}

export const logger = Logger.getInstance();
