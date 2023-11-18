import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { IconName } from "@tntfx/core";
import { IconsMap } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import { memoize } from "./memoize";
import "./svg.scss";

export type SvgProps = Partial<EnhancedProps> & {
  name: IconName;
  onClick?: () => void;
};

export const Svg = memoize(function Svg(props: SvgProps) {
  const { disabled } = props;
  const [className, { onClick, ...svgProps }] = parseProps(props);

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

  return props.name ? (
    <>
      {IconsMap[props.name]?.({
        className: classNames("svg", `svg-${props.name}`, className),
        onClick: handleClick,
        ...svgProps,
      }) || `[${props.name}]`}
    </>
  ) : null;
});
