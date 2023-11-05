import type { ClassAndChildren, Variant } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Box } from "./layout/box";
import { Text } from "./typography";
import "./badge.scss";

type BadgeProps = {
  count: number | string;
  variant?: Variant;
};

export function Badge(props: ClassAndChildren<BadgeProps>) {
  const { className, children, variant = "destructive", count } = props;

  return (
    <Box
      className={classNames("badge-wrapper", {
        [`${className}-badge-wrapper`]: className,
      })}
    >
      {children}
      {Boolean(count) && (
        <Box className={classNames("badge", className, `variant-${variant}`)}>
          <Text fontSize="xs" fontWeight="md">
            {count}
          </Text>
        </Box>
      )}
    </Box>
  );
}
