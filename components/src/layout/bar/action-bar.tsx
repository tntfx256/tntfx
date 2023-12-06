import type { ReactNode } from "react";
import { type Actionable, memoize, type PropsAndChildren } from "@tntfx/core";
import type { ToolbarSectionProps } from "./toolbar-section";
import { ToolbarSection } from "./toolbar-section";
import { useActions } from "./utils";

type ActionBarProps<T extends string = string> = PropsAndChildren & Actionable<T> & ToolbarSectionProps;

export const ActionBar = memoize(function ActionBar<T extends string = string>(props: ActionBarProps<T>) {
  const { actions, onAction, ...libProps } = props;
  // const { className, style } = useParseProps(styleProps);

  const actionableItems = useActions(actions, onAction);

  return actionableItems ? <ToolbarSection {...libProps}>{actionableItems}</ToolbarSection> : null;
}) as <T extends string = string>(props: ActionBarProps<T>) => ReactNode;
