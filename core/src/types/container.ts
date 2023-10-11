import type { Any } from "./base";
import type { AppEntity } from "./entity";
import type { Dimension } from "./frame";

const FrameStatuses = ["normal", "maximized", "minimized", "minimized_max"] as const;
export type FrameStatus = (typeof FrameStatuses)[number];

export type ContainerState = "active" | "background";
export type ContainerType = "bare" | "app";

export interface Container<T = Any> {
  id: string;
  entity: AppEntity;
  state: ContainerState;
  status: FrameStatus;
  dimension: Dimension;

  input?: T;
  deepLink?: string;
  boundary?: Partial<Dimension>;
}
