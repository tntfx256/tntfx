import type { BoxProps } from "@tntfx/components";
import { Box, Title } from "@tntfx/components";
import type { PropsAndChildren } from "@tntfx/core";

export function Wrapper(props: BoxProps) {
  return <Box className="wrapper" {...props} />;
}

interface SectionProps extends PropsAndChildren, BoxProps {
  title?: string;
}
export function Section(props: SectionProps) {
  const { title, children } = props;

  return (
    <div className="section">
      {title && (
        <Box horizontal className="section__title">
          <Title>{title}</Title>
        </Box>
      )}

      <div>{children}</div>
    </div>
  );
}
