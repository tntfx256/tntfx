import type { IconName } from "../icon";

export type EntityType = "App";

// ie: /users/home/username/test.txt
interface CommonEntity<T extends EntityType = EntityType> {
  type: T;
  // an icon representing this entity
  icon: IconName;
  // @readonly uniques id to identifies each entity
  id: string;
  // [test.txt]
  name: string;
  // the full path to where the file is located at [/users/home/username/test.txt]
  path: string;
}

export interface AppEntity extends CommonEntity<"App"> {
  standAlone?: boolean;
}

export type Entity = AppEntity;

export function isAppEntity(entity: Entity): entity is AppEntity {
  return entity.type === "App";
}
