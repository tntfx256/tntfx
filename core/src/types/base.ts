export type MaybePromise<T> = Promise<T> | T;
export type MightThrow<T> = T | never;
export type MightReject<T> = Promise<MightThrow<T>>;

export type Enumerable<T> = T | T[];
export type Nullable<T> = T | null;
export type Index = string | number | symbol;
export type Defined<T> = T extends null | undefined ? never : T;
export type EnumString<T extends string | number> = T | `${T}`;

export type Keys<T> = keyof T;
export type StringKeys<T extends TObject, K extends Keys<T> = Keys<T>> = K extends string ? K : never;
export type PropType<T, K extends Keys<T>> = T[K] extends (infer R)[] ? R : T[K];
export type ItemType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export type DeepPartial<T> = T extends object ? { [P in Keys<T>]?: DeepPartial<T[P]> } : T;
export type DeepRequired<T> = Required<{ [K in Keys<T>]: Required<DeepRequired<T[K]>> }>;


export type Any<T = any> = T | null | undefined | void;
export type Enum<T = string> = T[];
export type List<T = string> = T[];
export type TObject<T = Any, Idx extends Index = string> = Record<Idx, T>;

export type AssertType<Source, Parent> = Source extends Parent ? Source : Parent;
