import type { IconName } from "./icon";
import { EntityModel } from "./models/entity";
import { getBareName } from "./path";
import type { App, AppEntity, Entity, Nullable, OBJECT, SingletonApp, Widget } from "./types";
import { isAppEntity } from "./types";

export type InstallerConfig = {
  name: string;
  view: App | Widget | SingletonApp;
  icon: IconName;
  hidden?: boolean;
  singleton?: boolean;
};

type AppRegistry = { name: string; entity: AppEntity; App: App };

export class Applications {
  #apps: OBJECT<AppRegistry> = {};
  // #associations: Associations = {};

  list(): AppEntity[] {
    return Object.entries(this.#apps).map(([, { entity }]) => entity as AppEntity);
    // .filter(({ meta }) => !meta.attributes.hidden);
  }

  openWith(entity: Entity): Nullable<AppRegistry> {
    if (isAppEntity(entity)) {
      return this.#apps[getBareName(entity.name)];
    }

    return null;
  }

  createInstaller(config: InstallerConfig): AppRegistry {
    config = { ...config, singleton: !!config.singleton, hidden: !!config.hidden };

    const entity = EntityModel.createAppEntity(config);
    const name = getBareName(entity.name);
    this.#apps[name] = { name, App: config.view, entity };
    return this.#apps[name];
  }

  getByName(name: string) {
    return this.#apps[getBareName(name)]?.entity;
  }
}

export const applications = new Applications();
