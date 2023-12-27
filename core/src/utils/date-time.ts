import type { Timestamp } from "../types";

export const ONE_SECOND_MS = 1000;
export const ONE_MINUTE_MS = ONE_SECOND_MS * 60;
export const ONE_DAY_MS = ONE_MINUTE_MS * 60 * 24;

const zeroFill = (digit: number) => (digit > 9 ? digit : `0${digit}`);

export function formatDate(date: Date | number | string, showTime = true): string {
  date = date instanceof Date ? date : new Date(date);

  if (!date) return "-";

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return [year, month, day].map(zeroFill).join("/") + (showTime ? " " + [hour, minute].map(zeroFill).join(":") : "");
}

export function now(): Timestamp {
  return Date.now();
}

export function toTimestamp(date: Date | number | string): Timestamp {
  if (date instanceof Date) {
    return date.getTime();
  }

  return new Date(date).getTime();
}
