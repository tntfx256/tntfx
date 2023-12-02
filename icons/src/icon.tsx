import type { ForwardedRef, MouseEvent, ReactNode } from "react";
import { forwardRef } from "react";
import { type MaybePromise, memoize, type PropsAndChildren } from "@tntfx/core";
import type { EnhancedProps } from "@tntfx/theme";
import { classNames, useParseProps } from "@tntfx/theme";
import type { IconName, Icons } from "./icons-list";
import { IconsMap } from "./icons-list";
import "./icon.scss";

interface IconProps extends Partial<EnhancedProps>, PropsAndChildren {
  name: IconName | ReactNode;
  onClick?: (e: MouseEvent) => MaybePromise<void>;
}

function IconWithRef(props: IconProps, ref: ForwardedRef<HTMLSpanElement>) {
  const { name, onClick, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <span
      className={classNames("icon", className, `icon--${name}`, { "--hover": onClick })}
      ref={ref}
      style={style}
      onClick={onClick}
    >
      {(name as Icons) in IconsMap ? IconsMap[props.name as Icons]?.({ className: "icon__svg" }) || `[${props.name}]` : name}
    </span>
  );
}

export const Icon = memoize(forwardRef(IconWithRef));

Icon.displayName = "Icon";
