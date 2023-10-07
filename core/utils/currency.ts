import { formatNumber } from "./number";

export function formatCurrency(value: number, sign = "$", decimals = 2) {
  return (value < 0 ? "-" : "") + sign + formatNumber(Math.abs(value), decimals);
}
