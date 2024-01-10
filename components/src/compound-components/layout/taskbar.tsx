import type { ReactNode } from "react";
import { memoize, type OnAction } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import { Divider, Icon } from "../../base-components";
import { Box } from "../../base-components/box";
import { DateTime } from "../date-time";

export type TaskbarAction = "start" | "settings";

export interface TaskbarProps {
  position?: "left" | "bottom";
  className?: string;
  children?: ReactNode;
  onAction?: OnAction<TaskbarAction>;
  onLogout?: () => void;
}

export const Taskbar = memoize(function Taskbar(props: TaskbarProps) {
  const { children, onAction, onLogout, position = "bottom", ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <Box className={classNames(`taskbar taskbar--${position}`, className)} style={style}>
      <Box className="taskbar__start">
        {onLogout && <Icon name="Power" onClick={onLogout} />}
        <Icon
          name="Settings"
          onClick={() => {
            onAction?.("settings");
          }}
        />
      </Box>

      <Divider className="taskbar__divider" />

      <Box className="taskbar__middle">{children}</Box>

      <Divider className="taskbar__divider" />

      <Box className="taskbar__end">
        <DateTime />
      </Box>
    </Box>
  );
});
