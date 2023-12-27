import type { ReactNode } from "react";
import type { ToolbarGroupProps } from "@fluentui/react-components";
import { ToolbarGroup } from "@fluentui/react-components";
import { type Actionable, memoize, type PropsAndChildren } from "@tntfx/core";
import { useActions } from "./utils";

type ActionBarProps<T extends string = string> = PropsAndChildren & Actionable<T> & ToolbarGroupProps;

export const ActionBar = memoize(function ActionBar<T extends string = string>(props: ActionBarProps<T>) {
  const { actions, onAction, ...libProps } = props;
  // const { className, style } = useParseProps(styleProps);

  const actionableItems = useActions(actions, onAction);

  return actionableItems ? <ToolbarGroup {...libProps}>{actionableItems}</ToolbarGroup> : null;
}) as <T extends string = string>(props: ActionBarProps<T>) => ReactNode;
