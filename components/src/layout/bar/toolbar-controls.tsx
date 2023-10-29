import type { ClassAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Icon } from "../../icon";
import type { BoxProps } from "../box";
import { Box } from "../box";
import { FrameStatus } from "../frame/types";
import "./toolbar-controls.scss";

export type ToolbarControlsProps = ClassAndChildren<BoxProps> & {
  onClose?: () => void;
  onToggleMaximize?: () => void;
  frameStatus?: FrameStatus;
};

export function ToolbarControls(props: ToolbarControlsProps) {
  const {
    frameStatus,
    onToggleMaximize,
    onClose,
    className,
    children,
    ...box
  } = props;

  return (
    <Box
      horizontal
      className={classNames("toolbar-controls", className)}
      {...box}
    >
      {children}
      {onToggleMaximize && (
        <Icon
          size="lg"
          name={
            frameStatus === FrameStatus.Normal ? "maximize" : "restoreMaximize"
          }
          onClick={onToggleMaximize}
        />
      )}
      <Icon size="lg" name="cross" onClick={onClose} disabled={!onClose} />
    </Box>
  );
}
