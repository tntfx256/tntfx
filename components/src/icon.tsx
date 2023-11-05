import type { MouseEvent } from "react";
import { useCallback } from "react";
import type { MaybePromise, WithChildren } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import type { SvgProps } from "./svg";
import { Svg } from "./svg";
import { Text } from "./typography/text";
import "./icon.scss";

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
      <Svg color={props.color} name={name} size={props.size || "md"} />
      {title && <Text>{title}</Text>}
    </button>
  );
}
