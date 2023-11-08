import type { ReactNode } from "react";
import { useMemo } from "react";
import type { Actions, Any, Nullable, OnAction } from "@tntfx/core";
import { Action, ActionSet, logger } from "@tntfx/core";
import { Button } from "../../button";

export function getActions<T extends string = string>(handleClick?: OnAction<T>, actionSet?: Actions<T>): ReactNode[] {
  const handleAction = handleClick || ImplicitActionHandler;

  if (Array.isArray(actionSet)) {
    return actionSet.map((action) => (
      <Button
        key={action.id}
        color={action.color || "default"}
        endIcon={action.icon && action.iconPosition === "end" ? action.icon : undefined}
        startIcon={action.icon && action.iconPosition !== "end" ? action.icon : undefined}
        title={action.title}
        variant={action.variant || "void"}
        onClick={() => handleAction(action.id as Any)}
      />
    ));
  }

  switch (actionSet) {
    case ActionSet.OkCancel:
      return [
        <Button key="cancel" color="secondary" title="Cancel" onClick={() => handleAction(Action.Cancel as Any)} />,
        <Button key="ok" color="primary" title="Ok" variant="contained" onClick={() => handleAction(Action.Ok as Any)} />,
      ];

    case "RetryCancel":
      return [
        <Button key="cancel" color="secondary" title="Cancel" onClick={() => handleAction(Action.Cancel as Any)} />,
        <Button
          key="retry"
          color="primary"
          title="Retry"
          variant="contained"
          onClick={() => handleAction(Action.Retry as Any)}
        />,
      ];
  }

  // OK
  return [<Button key="ok" color="primary" title="Ok" variant="contained" onClick={() => handleAction(Action.Ok as Any)} />];
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
