import type { ReactElement } from "react";
import type { Any } from "./base";
import type { Container } from "./container";

export interface Dimension {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface BoundingRect extends Dimension {
  right: number;
  bottom: number;
}

export type Boundary = Partial<BoundingRect>;

export type AppProps = {
  container: Container;
  link?: string;
};

export type SingletonApp<T = Any> = (props: T) => ReactElement;
export type App = (props: AppProps) => ReactElement;
export type Widget = () => ReactElement;
