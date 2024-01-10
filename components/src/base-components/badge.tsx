import type { BadgeProps as LibBadgeProps } from "@fluentui/react-components";
import { Badge as LibBadge } from "@fluentui/react-components";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./badge.style";

export type BadgeProps = LibBadgeProps & {
  count: number | string;
};

export function Badge(props: BadgeProps) {
  const { children, className, count } = props;

  const classes = useStyle();

  return (
    <ins className={classNames(classes.root, className)}>
      {children}
      {Boolean(count) && <LibBadge className={classes.badge}>{count}</LibBadge>}
    </ins>
  );
}
