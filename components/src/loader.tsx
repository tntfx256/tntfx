import { classNames, parseProps } from "@tntfx/theme";
import type { BackdropProps } from "./backdrop";
import { Backdrop } from "./backdrop";
import "./loader.scss";

export type LoaderProps = {
  visible?: boolean;
  background?: BackdropProps["background"];
};

export function Loader(props: LoaderProps) {
  const [className, { visible, background, ...rest }] = parseProps(props);

  return (
    <Backdrop
      animation="zoom"
      background={background}
      className={classNames("loader", className)}
      isOpen={visible}
      {...rest}
    >
      <div className="loader__circle animation--rotate" />
    </Backdrop>
  );
}
