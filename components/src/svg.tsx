import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { IconName } from "@tntfx/core";
import { IconsMap } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, parseProps } from "@tntfx/theme";
import "./svg.scss";

export type SvgProps = Partial<EnhancedProps> & {
  name: IconName;
  onClick?: () => void;
};

export function Svg(props: SvgProps) {
  const [className, svgProps] = parseProps(props);

  const handleClick = useCallback((e: MouseEvent) => {
    if (props.onClick) {
      e.preventDefault();
      e.stopPropagation();

      if (!props.disabled) {
        props.onClick();
      }
    }
  }, []);

  return props.name ? (
    <>
      {IconsMap[props.name]?.({
        className: classNames("svg", `svg-${props.name}`, className),
        onClick: handleClick,
        ...svgProps,
      }) || `[${props.name}]`}
    </>
  ) : null;
}
