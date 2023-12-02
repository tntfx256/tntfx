import { memoize, type PropsAndChildren } from "@tntfx/core";
import { Icon } from "@tntfx/icons";
import { classNames, useParseProps } from "@tntfx/theme";
import type { BoxProps } from "../box";
import { Box } from "../box";
import { FrameStatus } from "../frame/types";
import "./frame-controls.scss";

export interface FrameControlsProps extends PropsAndChildren, BoxProps {
  onClose?: () => void;
  onToggleMaximize?: () => void;
  frameStatus?: FrameStatus;
}

export const FrameControls = memoize(function FrameControls(props: FrameControlsProps) {
  const { frameStatus, onToggleMaximize, onClose, children, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <Box horizontal className={classNames("frameControls", className)} style={style}>
      {children}
      {onToggleMaximize && (
        <Icon
          className="frameControls__icon"
          name={frameStatus === FrameStatus.Normal ? "maximize" : "restoreMaximize"}
          size="md"
          onClick={onToggleMaximize}
        />
      )}
      <Icon
        className="frameControls__icon frameControls__icon--close"
        disabled={!onClose}
        name="cross"
        size="md"
        onClick={onClose}
      />
    </Box>
  );
});
