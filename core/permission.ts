import type { OBJECT } from "./types";

export type PERMISSION = string;

export type PermissionGroup = "OWNER" | "ROOT" | "WORLD";
export type PermissionType = "EXEC" | "READ" | "WRITE";
export type PermissionSource = "BIRTH_DATE" | "COUNTRY" | "EMAIL" | "LOCATION";
// a map from appId to the permissions granted for that app
export type PermissionRegistry = OBJECT<PermissionType[]>;
export type PermissionRequest = {
  type: PermissionType;
  reason: string;
  onPermissionChange: (isGranted: boolean) => void;
};

type PermissionEntry = Record<PermissionType, boolean>;
export type ParsedPermission = Record<PermissionGroup, PermissionEntry>;

export const Permission = {
  parse(permission: PERMISSION): ParsedPermission {
    const [rr, rw, rx, or, ow, ox, wr, ww, wx] = permission.split("");

    return {
      OWNER: { EXEC: ox == "x", READ: or == "r", WRITE: ow == "w" },
      ROOT: { EXEC: rx == "x", READ: rr == "r", WRITE: rw == "w" },
      WORLD: { EXEC: wx == "x", READ: wr == "r", WRITE: ww == "w" },
    };
  },
  stringify(permission: ParsedPermission) {
    const { OWNER, WORLD } = permission;
    return ["rwx", convert(OWNER), convert(WORLD)].join("");

    function convert({ READ, WRITE, EXEC }: PermissionEntry) {
      return [READ ? "r" : "-", WRITE ? "w" : "-", EXEC ? "x" : "-"].join("");
    }
  },
};
