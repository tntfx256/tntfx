import type { FormEvent } from "react";
import { useCallback } from "react";
import { type Option, type PropsAndChildren } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import { Box } from "../layout";
import { ActionBar } from "../layout/bar/action-bar";
import { Text } from "../text";

export interface FormProps extends PropsAndChildren {
  legend?: string;
  actions?: Option[];
  // Model?: ModelConstructor<T>;
  // initialValues?: DeepPartial<T>;
  onSubmit?: () => void;
}

export function Form(props: FormProps) {
  const { actions, legend, children, onSubmit, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  // const {} = useModel<T>((Model || FreeModel) as ModelConstructor<T>, initialValues);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onSubmit?.();
    },
    [onSubmit]
  );

  return (
    <Box className={classNames("form", className)} style={style}>
      {legend && <Text className="form__legend">{legend}</Text>}

      <form onSubmit={handleSubmit}>
        {children}

        {actions && <ActionBar actions={actions} className="form__actions" />}
      </form>
    </Box>
  );
}

// export function useForm<T extends TObject = TObject>() {
//   const [state, setState] = useStore();

//   return;
// }
