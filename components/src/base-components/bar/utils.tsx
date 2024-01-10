import type { ReactNode } from "react";
import { useMemo } from "react";
import type { Actions, Any, Nullable, OnAction } from "@tntfx/core";
import { Action, ActionSet, logger } from "@tntfx/core";
import { Button } from "../../base-components/button";

export function getActions<T extends string = string>(handleClick?: OnAction<T>, actionSet?: Actions<T>): ReactNode[] {
  const handleAction = handleClick || ImplicitActionHandler;

  if (Array.isArray(actionSet)) {
    return actionSet.map((action) => (
      <Button
        key={action.id}
        appearance={action.accent || "transparent"}
        icon={action.icon}
        iconPosition={action.iconPosition}
        onClick={() => handleAction(action.id as Any)}
      >
        {action.title}
      </Button>
    ));
  }

  switch (actionSet) {
    case ActionSet.OkCancel:
      return [
        <Button key="cancel" appearance="secondary" title="Cancel" onClick={() => handleAction(Action.Cancel as Any)} />,
        <Button key="ok" appearance="primary" color="primary" title="Ok" onClick={() => handleAction(Action.Ok as Any)} />,
      ];

    case "RetryCancel":
      return [
        <Button key="cancel" appearance="secondary" title="Cancel" onClick={() => handleAction(Action.Cancel as Any)} />,
        <Button
          key="retry"
          appearance="primary"
          title="Retry"
          // variant="contained"
          onClick={() => handleAction(Action.Retry as Any)}
        />,
      ];
  }

  // OK
  return [<Button key="ok" appearance="primary" title="Ok" onClick={() => handleAction(Action.Ok as Any)} />];
}

function ImplicitActionHandler(action: string) {
  logger.warn(`No handler was provided for ${action}`);
}

export function useActions<T extends string>(actions?: Actions<T>, onAction?: OnAction<T>): Nullable<ReactNode[]> {
  const alertActions = useMemo(() => {
    return actions ? getActions<T>(onAction, actions) : null;
  }, [actions, onAction]);

  return alertActions;
}
