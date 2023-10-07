export function normalize(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  return values.map((value) => ~~((value - min) / range) * 9 + 1);
}

export function formatNumber(number: number, decimal = 2) {
  return isNaN(number) ? NaN : +number.toFixed(decimal);
}
