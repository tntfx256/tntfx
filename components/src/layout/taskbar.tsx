import type { ClassAndChildren, OnAction } from "@tntfx/core";
import { classNames, parseProps, theme } from "@tntfx/theme";
import { Box } from "./box";
import { DateTime } from "../date-time";
import { Icon } from "../icon";
import { Spacer } from "../spacer";
import "./taskbar.scss";

export type TaskbarAction = "start" | "settings";

export type TaskbarProps = {
  onAction?: OnAction<TaskbarAction>;
  onLogout?: () => void;
};

export function Taskbar(props: ClassAndChildren<TaskbarProps>) {
  const [className, { children, onAction, onLogout, ...rest }] = parseProps(props);

  return (
    <Box className={classNames("taskbar", className)} {...rest}>
      <Box className="taskbar__start">
        {onLogout && <Icon color={theme.palette.error} name="power" onClick={onLogout} />}
        <Icon
          name="settings"
          onClick={() => {
            onAction?.("settings");
          }}
        />
      </Box>

      <Spacer className="taskbar__divider" />

      <Box className="taskbar__middle">{children}</Box>

      <Spacer className="taskbar__divider" />

      <Box className="taskbar__end">
        <DateTime />
      </Box>
    </Box>
  );
}
