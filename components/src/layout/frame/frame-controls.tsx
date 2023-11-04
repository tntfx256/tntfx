import type { ClassAndChildren } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { Icon } from "../../icon";
import type { BoxProps } from "../box";
import { Box } from "../box";
import { FrameStatus } from "../frame/types";
import "./frame-controls.scss";

export type FrameControlsProps = ClassAndChildren<BoxProps> & {
  onClose?: () => void;
  onToggleMaximize?: () => void;
  frameStatus?: FrameStatus;
};

export function FrameControls(props: FrameControlsProps) {
  const [className, { frameStatus, onToggleMaximize, onClose, children, ...rest }] = parseProps(props);

  return (
    <Box horizontal className={classNames("frameControls", className)} {...rest}>
      {children}
      {onToggleMaximize && (
        <Icon
          size="md"
          name={frameStatus === FrameStatus.Normal ? "maximize" : "restoreMaximize"}
          onClick={onToggleMaximize}
        />
      )}
      <Icon size="md" name="cross" onClick={onClose} disabled={!onClose} />
    </Box>
  );
}
