import { memoize, type OnAction, type PropsAndChildren } from "@tntfx/core";
import { Icon } from "@tntfx/icons";
import { classNames, theme, useParseProps } from "@tntfx/theme";
import { Box } from "./box";
import { DateTime } from "../date-time";
import { Divider } from "../divider";
import "./taskbar.scss";

export type TaskbarAction = "start" | "settings";

export interface TaskbarProps extends PropsAndChildren {
  position?: "left" | "bottom";
  onAction?: OnAction<TaskbarAction>;
  onLogout?: () => void;
}

export const Taskbar = memoize(function Taskbar(props: TaskbarProps) {
  const { children, onAction, onLogout, position = "bottom", ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return (
    <Box className={classNames(`taskbar taskbar--${position}`, className)} style={style}>
      <Box className="taskbar__start">
        {onLogout && <Icon color={theme.palette.error} name="power" onClick={onLogout} />}
        <Icon
          name="settings"
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
