import { ClassAndChildren, OnAction, Option } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { DateTime } from "../date-time";
import { ActionBar } from "./bar";
import { Box } from "./box";
import "./taskbar.scss";

export type TaskbarAction = "start" | "settings";
const taskbarActions: Option<TaskbarAction>[] = [
  { id: "start", title: "", icon: "apps" },
  { id: "settings", title: "", icon: "settings" },
];

export type TaskbarProps = {
  onAction?: OnAction<TaskbarAction>;
};

export function Taskbar(props: ClassAndChildren<TaskbarProps>) {
  const { className, children, onAction } = props;

  return (
    <Box className={classNames("taskbar", className)}>
      <Box className="taskbar-section taskbar-start">
        <ActionBar onAction={onAction} actions={taskbarActions} />
      </Box>

      <Box className="taskbar-section taskbar-middle">{children}</Box>
      <Box className="taskbar-section taskbar-end">
        <DateTime />
      </Box>
    </Box>
  );
}
