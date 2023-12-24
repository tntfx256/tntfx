export type MaybePromise<T> = Promise<T> | T;
export type MightThrow<T> = T | never;
export type MightReject<T> = Promise<T | never>;
export type Enumerable<T> = T | T[];
export type Nullable<T> = T | null;
export type Defined<T> = T extends null | undefined ? never : T;
export type EnumString<T extends string | number> = T | `${T}`;

export type Index = string | number | symbol;
export type Keys<T> = keyof T;
export type StringKeys<T, K extends Keys<T> = Keys<T>> = K extends string ? K : never;
export type Type<T, K extends Keys<T>> = T[K] extends (infer R)[] ? R : T[K];
export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
export type DeepPartial<T> = T extends object ? { [P in Keys<T>]?: DeepPartial<T[P]> } : T;
export type DeepRequired<T> = Required<{ [K in Keys<T>]: Required<DeepRequired<T[K]>> }>;

export type Any<T = any> = T | null | undefined | void;
export type Timestamp = number;
export type Enum<T = string> = T[];
export type List<T = string> = T[];
export type TObject<TValue = Any, TIndex extends Index = string> = Record<TIndex, TValue>;

export type Assert<Source, Parent> = Source extends Parent ? Source : Parent;
