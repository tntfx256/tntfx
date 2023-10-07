import { memo } from "react";
import type { ClassName, Entity, IconName } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Icon } from "./icon";
import "./entity-item.scss";

export type EntityProps = {
  onOpen?: (entity: Entity) => void;
  onSelect?: (entity: Entity) => void;
};

export type EntityItemProps = EntityProps & {
  entity: Entity;
  icon?: IconName;
  disabled?: boolean;
  selected?: boolean;
};

export const EntityItem = memo(function EntityItem(props: ClassName<EntityItemProps>) {
  const { entity, icon, disabled, onSelect, onOpen, className } = props;
  const entityIcon = icon || entity.icon;

  function handleClick() {
    if (onOpen || onSelect) {
      if (disabled) return;

      onOpen ? onOpen(entity) : onSelect?.(entity);
    }
  }

  const rawName = entity.name.replace(/\..+$/, "");

  return (
    <Icon
      className={classNames("entity-item", className)}
      name={entityIcon}
      size="xLarge"
      title={rawName}
      onClick={handleClick}
    />
  );
});
