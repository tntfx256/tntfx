import type { Props } from "@tntfx/core";
import { classNames, useParseProps } from "@tntfx/theme";
import type { BackdropProps } from "./backdrop";
import { Backdrop } from "./backdrop";
import "./loader.scss";

export interface LoaderProps extends Props {
  visible?: boolean;
  background?: BackdropProps["background"];
}

export function Loader(props: LoaderProps) {
  const { visible, background, ...styleProps } = props;
  const { className, style } = useParseProps(styleProps);

  return visible ? (
    <Backdrop isOpen animation="zoom" background={background} className={classNames("loader", className)} style={style}>
      <div className="loader__circle animation--rotate" />
    </Backdrop>
  ) : null;
}
