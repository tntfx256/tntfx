import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { mergeClasses } from "@fluentui/react-components";
import type { FluentIconsProps } from "@fluentui/react-icons";
import { useStyles } from "./icon.style";
import type { IconName } from "./icons-list";
import { IconsMap } from "./icons-list";

interface IconProps extends FluentIconsProps {
  name: IconName;
  disabled?: boolean;
}

function IconWithRef(props: IconProps, ref: ForwardedRef<SVGSVGElement>) {
  const { name, disabled, className, ...libProps } = props;

  const classes = useStyles();
  const Component = IconsMap[name];
  return Component ? (
    <Component aria-disabled={disabled} {...libProps} className={mergeClasses(classes.root, className)} ref={ref} />
  ) : (
    name
  );
}

export const Icon = forwardRef(IconWithRef);
Icon.displayName = "Icon";
