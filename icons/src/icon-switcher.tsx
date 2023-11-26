import type { Props } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Icon } from "./icon";
import type { Icons } from "./icons-list";
import "./icon-switcher.scss";

type IconSwitcherType = `${Icons}_${Icons}`;

export type IconSwitcherProps = Props & {
  type: IconSwitcherType;
  useAlt?: boolean;
};

export function IconSwitcher(props: IconSwitcherProps) {
  const { type, useAlt } = props;

  const [mainIcon, altIcon] = type.split("_");
  return (
    <span className={classNames("iconSwitcher", classNames)}>
      <Icon
        className={classNames("iconSwitcher__icon iconSwitcher--main", { ["iconSwitcher--active"]: !useAlt })}
        name={mainIcon}
      />
      <Icon
        className={classNames("iconSwitcher__icon iconSwitcher--alt", { ["iconSwitcher--active"]: useAlt })}
        name={altIcon}
      />
    </span>
  );
}
