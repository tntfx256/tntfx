import { Field } from "../field";
import type { IconName } from "../icon";
import { Model } from "../model";
import type { AppEntity, DeepPartial, Entity } from "../types";
import { generateId } from "../utils/etc";
import { Regex } from "../validation";

export type CreateEntityData = {
  name: string;
  hidden?: boolean;
  icon?: IconName;
  system?: boolean;
  type?: string;
};

export class EntityModel extends Model<Entity> {
  static get fields() {
    return {
      icon: new Field("name", { type: "STRING" }),
      id: new Field("id", { length: 16, required: true, type: "STRING" }),
      name: new Field("name", { pattern: Regex.FILE_NAME, required: true, type: "STRING" }),
      path: new Field("name", { required: true, type: "STRING" }),
      type: new Field("type", { enum: ["APP", "DIR", "FILE"], type: "ENUM" }),
    };
  }

  static createAppEntity(data: CreateEntityData): AppEntity {
    const { name, icon = "apps" } = data;
    return {
      icon,
      id: generateId(),
      name,
      path: `/${name}`,
      type: "App",
    };
  }

  static clone<T extends Entity>(entity: T, update?: DeepPartial<T>): T {
    return { ...entity, ...update };
  }
}
