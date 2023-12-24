import type { SpinnerProps } from "@fluentui/react-components";
import { Spinner } from "@fluentui/react-components";
import { classNames } from "@tntfx/theme";
import { Box } from "./layout";
import { useStyle } from "./loader.style";

export interface LoaderProps extends SpinnerProps {
  visible?: boolean;
  // global?: boolean;
  background?: "transparent" | "blur";
}

export function Loader(props: LoaderProps) {
  const { visible, background, className, ...libProps } = props;

  const classes = useStyle();

  return visible ? (
    <Box
      className={classNames(
        classes.root,
        background === "blur" && classes.blur,
        background === "transparent" && classes.transparent
      )}
    >
      <Spinner className={classNames(classes.spinner, className)} unselectable="on" {...libProps} />
    </Box>
  ) : null;
}
