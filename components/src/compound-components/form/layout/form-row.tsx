import { Field } from "@fluentui/react-components";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./form-row.style";
import type { BoxProps } from "../../../base-components";
import { Box } from "../../../base-components";

type FormRowProps = Omit<BoxProps, "horizontal"> & {
  title?: string;
};

export function FormRow(props: FormRowProps) {
  const { className, children, title, ...rest } = props;

  const classes = useStyle();

  return (
    <Field className={classes.field} label={title}>
      <Box horizontal className={classNames(classes.root, className)} {...rest}>
        {children}
      </Box>
    </Field>
  );
}
