import type { TIMESTAMP } from "../types";

export const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

export function now(): TIMESTAMP {
  return Date.now();
}

export function toTimestamp(date: Date | number | string): TIMESTAMP {
  if (date instanceof Date) {
    return date.getTime();
  }

  return new Date(date).getTime();
}
