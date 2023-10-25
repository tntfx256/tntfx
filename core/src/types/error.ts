import type { SerializableError } from "../error";

export type TError = Error | SerializableError | string | unknown;
