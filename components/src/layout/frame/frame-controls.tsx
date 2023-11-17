import type { ClassAndChildren } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { Icon } from "../../icon";
import { memoize } from "../../memoize";
import type { BoxProps } from "../box";
import { Box } from "../box";
import { FrameStatus } from "../frame/types";
import "./frame-controls.scss";

export type FrameControlsProps = ClassAndChildren<BoxProps> & {
  onClose?: () => void;
  onToggleMaximize?: () => void;
  frameStatus?: FrameStatus;
};

export const FrameControls = memoize(function FrameControls(props: FrameControlsProps) {
  const [className, { frameStatus, onToggleMaximize, onClose, children, ...rest }] = parseProps(props);

  return (
    <Box horizontal className={classNames("frameControls", className)} {...rest}>
      {children}
      {onToggleMaximize && (
        <Icon
          name={frameStatus === FrameStatus.Normal ? "maximize" : "restoreMaximize"}
          size="md"
          onClick={onToggleMaximize}
        />
      )}
      <Icon disabled={!onClose} name="cross" size="md" onClick={onClose} />
    </Box>
  );
});
