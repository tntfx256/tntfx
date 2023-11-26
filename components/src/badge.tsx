import type { Accent, EnumString, PropsAndChildren } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import { Box } from "./layout/box";
import { Text } from "./typography";
import "./badge.scss";

export interface BadgeProps extends PropsAndChildren {
  count: number | string;
  accent?: EnumString<Accent>;
}

export function Badge(props: BadgeProps) {
  const { children, count } = props;
  const { className, style } = useParseProps(props);

  return (
    <Box
      style={style}
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
