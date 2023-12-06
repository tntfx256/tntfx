import type { SpinnerProps } from "@fluentui/react-components";
import { Spinner } from "@fluentui/react-components";
import { classNames } from "@tntfx/theme";
import { Box } from "./layout";
import { useStyle } from "./loader.style";
import { Portal } from "./portal";

export interface LoaderProps extends SpinnerProps {
  visible?: boolean;
  global?: boolean;
  background?: "transparent" | "blur";
}

export function Loader(props: LoaderProps) {
  const { visible, background, global, className, ...libProps } = props;

  const classes = useStyle();

  return visible ? (
    <Portal disable={!global}>
      <Box
        className={classNames(
          classes.root,
          background === "blur" && classes.blur,
          background === "transparent" && classes.trnsparent
        )}
      >
        <Spinner className={classNames(classes.spinner, className)} {...libProps} />
      </Box>
    </Portal>
  ) : null;
}
