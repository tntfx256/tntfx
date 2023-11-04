import { type EnhancedProps as InternalEnhancedProps } from "./style-props";

export * from "./media-queries";
export { parseProps } from "./style-props";

export type EnhancedProps = Partial<InternalEnhancedProps>;
