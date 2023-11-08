import type { ClassAndChildren, Color } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { Box } from "./layout/box";
import { Text } from "./typography";
import "./badge.scss";

type BadgeProps = {
  count: number | string;
  color?: Color;
};

export function Badge(props: ClassAndChildren<BadgeProps>) {
  const [className, { children, count }] = parseProps(props);

  return (
    <Box
      className={classNames("badge-wrapper", {
        [`${className}-badge-wrapper`]: className,
      })}
    >
      {children}
      {Boolean(count) && (
        <Box className={classNames("badge", className)}>
          <Text fontSize="xs" fontWeight="md">
            {count}
          </Text>
        </Box>
      )}
    </Box>
  );
}
