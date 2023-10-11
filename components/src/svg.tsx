import type { MouseEvent } from "react";
import { memo, useCallback } from "react";
import type { ClassName, IconName, Size } from "@tntfx/core";
import { IconsMap } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import "./svg.scss";

export type SvgProps = {
  name: IconName;
  color?: string;
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
};

export const Svg = memo(function Svg(props: ClassName<SvgProps>) {
  const { name, className, size, color, disabled, onClick } = props;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (onClick) {
        e.preventDefault();
        e.stopPropagation();

        if (!disabled) {
          onClick();
        }
      }
    },
    [disabled, onClick]
  );

  return (
    <>
      {IconsMap[name]?.({
        className: classNames("svg", className, `svg-${name}`, `size-${size}`, { disabled }),
        style: { color },
        onClick: handleClick,
      }) || `[${name}]`}
    </>
  );
});
