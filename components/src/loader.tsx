import type { CSSProperties } from "react";
import { memo } from "react";
import type { ClassName, Variant } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import type { BackdropProps } from "./backdrop";
import { Backdrop } from "./backdrop";
import "./loader.scss";

type SkeletonProps = {};

export type LoaderProps = {
  visible?: boolean;
  variant?: Variant;
  color?: CSSProperties["color"];
  background?: BackdropProps["background"];
  skeletonProps?: SkeletonProps;
};

export const Loader = memo(function Loader(props: ClassName<LoaderProps>) {
  const { visible, className, background, color, variant } = props;

  return (
    <Backdrop
      animation="zoom"
      background={background}
      className={classNames("loader", className, `variant-${variant}`)}
      isOpen={visible}
    >
      <div className="loader-circle animation-rotate" style={{ borderTopColor: color }} />
    </Backdrop>
  );
});
