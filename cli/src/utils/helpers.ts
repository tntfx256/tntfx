export function camelCase(string: string) {
  return `${string[0].toLowerCase()}${string.slice(1)}`
    .replace(/[-\s]([a-z])/g, (x, char) => char.toUpperCase())
    .replace(/[^\w-]+/g, "");
}

export function upperFirst(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function pascalCase(string: string) {
  return upperFirst(camelCase(string));
}

export function kebabCase(string: string) {
  return string.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
}
