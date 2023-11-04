import type { MaybePromise, WithChildren } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import type { MouseEvent } from "react";
import { useCallback } from "react";
import "./icon.scss";
import type { SvgProps } from "./svg";
import { Svg } from "./svg";
import { Text } from "./typography/text";

type IconProps = SvgProps & {
  title?: string;
  onClick?: () => MaybePromise<void>;
};

export function Icon(props: WithChildren<IconProps>) {
  const [className, { name, disabled, onClick, title, ...btnProps }] = parseProps(props);

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

  return (
    <button
      className={classNames("icon", className, `icon-${name}`)}
      disabled={disabled}
      onClick={handleClick}
      {...btnProps}
    >
      <Svg name={name} size={props.size || "md"} color={props.color} />
      {title && <Text>{title}</Text>}
    </button>
  );
}
