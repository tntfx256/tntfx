import { useCallback, useEffect, useRef } from "react";
import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import type { Nullable, SerializableError } from "@tntfx/core";
import { Err } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Conditional } from "./conditional";
import { Loader } from "../base-components/loader";
import { useStateReducer } from "../hooks";

type ImageState = {
  isLoading: boolean;
  width: number;
  height: number;
  error: Nullable<SerializableError>;
};

export type ImageProps = NextImageProps & {};

export function Image(props: ImageProps) {
  const { src, alt, className, ...nextImageProps } = props;

  const ref = useRef<Nullable<HTMLElement>>(null);

  const [{ isLoading, width, height, error }, setState] = useStateReducer<ImageState>({
    isLoading: true,
    width: 0,
    height: 0,
    error: null,
  });

  const handleError = useCallback(() => {
    setState({ isLoading: false, error: Err(Err.Name.CLIENT, Err.Message.NOT_FOUND) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoad = useCallback(() => {
    setState({ isLoading: false, error: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setState({ isLoading: false, width, height });
    } else {
      setState({ isLoading: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <figure className={classNames("image --noUserSelect", className)} ref={ref}>
      <Conditional
        error={error}
        fallback={
          <NextImage
            alt={alt}
            className="image-view"
            height={height}
            placeholder="empty"
            src={src}
            width={width}
            onError={handleError}
            onLoad={handleLoad}
            {...nextImageProps}
          />
        }
      />
      <Loader visible={isLoading} />
    </figure>
  );
}
