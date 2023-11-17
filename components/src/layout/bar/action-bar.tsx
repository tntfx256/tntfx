import type { ReactNode } from "react";
import type { Actionable, ClassAndChildren } from "@tntfx/core";
import { classNames, parseProps } from "@tntfx/theme";
import type { ToolbarSectionProps } from "./toolbar-section";
import { ToolbarSection } from "./toolbar-section";
import { useActions } from "./utils";
import { memoize } from "../../memoize";

type ActionBarProps<T extends string = string> = ClassAndChildren & Actionable<T> & ToolbarSectionProps;

export const ActionBar = memoize(function ActionBar<T extends string = string>(props: ActionBarProps<T>) {
  const [className, { actions, onAction, ...libProps }] = parseProps(props);

  const actionableItems = useActions(actions, onAction);

  return actionableItems ? (
    <ToolbarSection className={classNames("actionBar", className)} {...libProps}>
      {actionableItems}
    </ToolbarSection>
  ) : null;
}) as <T extends string = string>(props: ActionBarProps<T>) => ReactNode;
