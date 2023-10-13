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
