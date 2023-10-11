import { Err } from "./error";
import { Regex } from "./validation";

export function isValidFileName(name: string) {
  return Regex.FILE_NAME.test(name);
}

export function parse(path: string) {
  const parseError = Err(Err.Name.FS, Err.Message.VALUE_INVALID);

  if (!path) {
    throw parseError;
  }

  const pathParts = path
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== ".");

  if (!pathParts.length) {
    // it's / or // or /./..
    return { base: "/", dir: "/", ext: "", name: "/", path: "/" };
  }

  let i = 0;
  while (i < pathParts.length) {
    const part = pathParts[i];
    // if (!isValid(part)) {
    //   throw parseError;
    // }
    if (part == "..") {
      if (i > 0) {
        pathParts.splice(i - 1, 2);
      }
    } else {
      i++;
    }
  }

  if (!pathParts.length) {
    throw parseError;
  }

  const root = path.startsWith("/") ? "/" : "";

  const nameParts = pathParts.pop()!.split(".");
  const dir = root + pathParts.join("/");

  const ext = nameParts.length > 1 ? nameParts.pop()! : "";
  const name = nameParts.join(".");
  const base = name + (ext ? `.${ext}` : "");
  const normalizedPath = dir + (dir.length > 1 ? "/" : "") + base;

  return { base, dir, ext, name, path: normalizedPath };
}

export function getBareName(name: string) {
  return parse(name).name.toLowerCase();
}

export function normalize(path: string): string {
  return parse(path).path;
}

export function join(...paths: string[]) {
  return parse(paths.join("/")).path;
}
