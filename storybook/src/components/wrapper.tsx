import type { BoxProps } from "@tntfx/components";
import { Box, Title } from "@tntfx/components";
import type { PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import "./wrapper.scss";

export function Wrapper(props: BoxProps) {
  return <Box className="wrapper" {...props} />;
}

interface SectionProps extends PropsAndChildren, BoxProps {
  title?: string;
}
export function Section(props: SectionProps) {
  const { title, children, className, ...boxProps } = props;

  return (
    <Box className="section">
      {title && (
        <Box horizontal className="section__title">
          <Title>{title}</Title>
        </Box>
      )}

      <Box className={classNames("section__body", className)} {...boxProps}>
        {children}
      </Box>
    </Box>
  );
}
