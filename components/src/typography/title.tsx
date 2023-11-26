import { memoize } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import type { TextProps } from "./text";
import { Text } from "./text";
import "./title.scss";

export const Title = memoize(function Title(props: TextProps) {
  const { children, as = "h1", ...rest } = props;
  const { className, style } = useParseProps(rest);

  return (
    <Text as={as} className={classNames("title", className)} style={style}>
      {children}
    </Text>
  );
});
