import type { HTMLAttributes } from "react";
import type { PropsAndChildren } from "@tntfx/core";
import { memoize } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import { Icon } from "@tntfx/icons";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import "./link.scss";

type N = HTMLAttributes<HTMLAnchorElement>;

export interface LinkProps extends Partial<EnhancedProps>, PropsAndChildren {
  href?: string;
  title?: string;
  external?: boolean;
  icon?: IconName;

  onClick?: N["onClick"];
}

export const Link = memoize(function Link(props: LinkProps) {
  const { children, external, title, icon, ...rest } = props;
  const { className, style } = useParseProps(rest);

  return (
    <a
      className={classNames("link", className)}
      title={title}
      {...(external ? { rel: "noreferrer", target: "_blank" } : null)}
      style={style}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {children || title}
      {external && <Icon name="linkExternal" />}
    </a>
  );
});
