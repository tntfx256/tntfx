import type { ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { BoxProps } from "../box";
import { Box } from "../box";
import "./toolbar-controls.scss";

export type ToolbarControlsProps = ClassAndChildren<BoxProps> & {
  onClose?: () => void;
};

export function ToolbarControls(props: ToolbarControlsProps) {
  const { onClose, className, children, ...box } = props;

  const hasActions = Boolean(onClose);
  return hasActions ? (
    <Box horizontal className={classNames("toolbar-controls", className)} {...box}>
      {children}
    </Box>
  ) : null;
}
