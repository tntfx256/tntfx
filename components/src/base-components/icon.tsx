import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { mergeClasses } from "@fluentui/react-components";
import type { FluentIconsProps } from "@fluentui/react-icons";
import type { EnumString, Size } from "@tntfx/core";
import type { IconName } from "@tntfx/icons";
import { IconsMap } from "@tntfx/icons/src/icons-list";
import { Style } from "@tntfx/theme";
import { useStyles } from "./icon.style";

interface IconProps extends FluentIconsProps {
  size?: EnumString<Size>;
  name: IconName;
  disabled?: boolean;
}

function IconWithRef(props: IconProps, ref: ForwardedRef<SVGSVGElement>) {
  const { name, disabled, className, size = "md", style = {}, ...libProps } = props;

  if (size) {
    style.width = Style.tokens.size[size];
    style.minWidth = Style.tokens.size[size];
    style.height = Style.tokens.size[size];
    style.minHeight = Style.tokens.size[size];
  }

  const classes = useStyles();
  const Component = IconsMap[name];
  return Component ? (
    <Component
      aria-disabled={disabled}
      style={style}
      {...libProps}
      className={mergeClasses(classes.root, className)}
      ref={ref}
    />
  ) : (
    name
  );
}

export const Icon = forwardRef(IconWithRef);
Icon.displayName = "Icon";
