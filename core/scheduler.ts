import { Err } from "./error";
import { logger } from "./logger";
import type { Any, MaybePromise } from "./types";

export interface Task {
  name: string;
  run: () => MaybePromise<void>;

  /**
   * @description setting a timer or interval
   *  to set a timeout pass a number e.g. 5
   *  to set an interval pass a number with asterisk e.g. 5*
   * */
  interval: number | string;

  /**
   * @description wait for the first interval, or exec at first and upcoming intervals; default true
   */
  wait?: boolean;
}

interface ParsedInterval {
  shouldRun: boolean;
  isLastTime: boolean;
}

export class Timer {
  static #timer: Any;
  static #counter = 0;
  static #tasks: Task[] = [];

  static #parse(interval: Task["interval"], wait: boolean): ParsedInterval {
    if (typeof interval === "number") {
      const shouldRun = interval % Timer.#counter === 0 && (!wait || (wait && Timer.#counter > 1));
      return { shouldRun, isLastTime: shouldRun };
    }

    const result = /(\d+)[^\*]*(\*?)/.exec(interval);
    if (!result) {
      return { shouldRun: false, isLastTime: true };
    }

    const [, timeoutStr, repeater] = result;
    const timeout = +timeoutStr;
    const shouldRun = timeout % Timer.#counter === 0 && (!wait || (wait && Timer.#counter > 1));
    return { shouldRun: +timeout % Timer.#counter === 0, isLastTime: shouldRun && repeater !== "*" };
  }

  static #runner = () => {
    Timer.#counter += 1;

    for (const { interval, name, run, wait = true } of Timer.#tasks) {
      const { shouldRun, isLastTime } = Timer.#parse(interval, wait);

      if (shouldRun) {
        // assuring the failure of a task won't affect the scheduler
        try {
          const result = run();
          if (result instanceof Promise) {
            result.catch((error) => {
              logger.warn(Err.finalize(error));
            });
          }
        } catch (error) {
          logger.warn(Err.finalize(error));
        } finally {
          if (isLastTime) {
            Timer.stopTask(name);
          }
        }
      }
    }
  };

  static start() {
    // run the scheduler if it's not running
    if (Timer.#counter === 0) {
      Timer.#runner();
      Timer.#timer = setInterval(Timer.#runner, 1000);
    }
  }

  static stop() {
    clearInterval(Timer.#timer);
    Timer.#counter = 0;
  }

  static schedule(scheduler: Task) {
    // check task name
    if (Timer.#tasks.some(({ name }) => scheduler.name == name)) {
      throw Err(Err.Name.VALIDATION, Err.Message.ALREADY_EXISTS);
    }

    // check if name exists
    Timer.#tasks.push(scheduler);
  }

  static stopTask(name: string) {
    Timer.#tasks = Timer.#tasks.filter((task) => task.name !== name);
    // check if any task is left
    if (Timer.#tasks.length == 0) {
      Timer.stop();
    }
  }
}
