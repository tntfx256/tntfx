import type { MouseEvent } from "react";
import { memo, useCallback } from "react";
import type { ClassAndChildren, Layout, MaybePromise, Variant } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { SvgProps } from "./svg";
import { Svg } from "./svg";
import { Text } from "./typography/text";
import "./icon.scss";

type IconProps = SvgProps & {
  color?: string;
  layout?: Layout;
  title?: string;
  disabled?: boolean;
  variant?: Variant;
  onClick?: () => MaybePromise<void>;
};

export const Icon = memo(function Icon(props: ClassAndChildren<IconProps>) {
  const { className, name, disabled, onClick, title, color, size = "medium", layout = "vertical", variant } = props;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (onClick) {
        e.stopPropagation();
        e.preventDefault();

        if (!disabled) {
          onClick();
        }
      }
    },
    [onClick, disabled]
  );

  const classes = classNames("icon", className, `icon-${name}`, `layout-${layout}`, `variant-${variant}`, {
    clickable: onClick && !disabled,
    _disabled: disabled,
  });

  return (
    <button className={classes} disabled={disabled} style={{ color }} onClick={handleClick}>
      <Svg name={name} size={size} />
      {title && <Text size={size}>{title}</Text>}
    </button>
  );
});
