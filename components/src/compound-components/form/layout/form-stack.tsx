import { classNames } from "@tntfx/theme";
import { useStyle } from "./form-stack.style";
import type { BoxProps } from "../../../base-components";
import { Box } from "../../../base-components";

type FormStackProps = Omit<BoxProps, "horizontal">;
export function FormStack(props: FormStackProps) {
  const { className, children, ...rest } = props;
  const { root } = useStyle();

  return (
    <Box className={classNames(root, className)} {...rest}>
      {children}
    </Box>
  );
}
