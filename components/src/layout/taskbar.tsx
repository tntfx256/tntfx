import type { ClassAndChildren, OnAction, Option } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import { useActions } from "./bar/utils";
import { Box } from "./box";
import { DateTime } from "../date-time";
import { Icon } from "../icon";
import "./taskbar.scss";

export type TaskbarAction = "start" | "settings";
const taskbarActions: Option<TaskbarAction>[] = [
  { id: "start", title: "", icon: "apps" },
  { id: "settings", title: "", icon: "settings" },
];

export type TaskbarProps = {
  onAction?: OnAction<TaskbarAction>;
  onLogout?: () => void;
};

export function Taskbar(props: ClassAndChildren<TaskbarProps>) {
  const [className, { children, onAction, onLogout, ...rest }] = parseProps(props);

  const actionableItems = useActions(taskbarActions, onAction);

  return (
    <Box className={classNames("taskbar", className)} {...rest}>
      <Box className="taskbar__start">{actionableItems}</Box>

      <Box className="taskbar__middle">{children}</Box>

      <Box className="taskbar__end">
        {onLogout && <Icon name="power" onClick={onLogout} />}
        <DateTime />
      </Box>
    </Box>
  );
}
