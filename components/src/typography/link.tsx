import type { HTMLAttributes } from "react";
import type { ClassAndChildren, IconName } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import { Icon } from "../icon";
import { memoize } from "../memoize";
import { Svg } from "../svg";
import "./link.scss";

type N = HTMLAttributes<HTMLAnchorElement>;

type LinkProps = Partial<EnhancedProps> & {
  href?: string;
  title?: string;
  external?: boolean;
  icon?: IconName;

  onClick?: N["onClick"];
};

export const Link = memoize(function Link(props: ClassAndChildren<LinkProps>) {
  const [className, { children, external, title, icon, ...rest }] = parseProps(props);

  return (
    <a
      className={classNames("link", className)}
      title={title}
      {...(external ? { rel: "noreferrer", target: "_blank" } : null)}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {children || title}
      {external && <Svg name="linkExternal" />}
    </a>
  );
});
