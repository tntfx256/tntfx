import { useCallback, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";
import { type Dimension, memoize } from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { Icon } from "@tntfx/icons";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./frame.style";
import { FrameProvider } from "./frame-provider";
import type { FrameProps } from "./types";
import { FrameStatus } from "./types";
import { useFrameDrag } from "./use-frame-drag";
import { useFrameResize } from "./use-frame-resize";
import { Title } from "../../text";
import { Box } from "../box";

export const Frame = memoize(function Frame(props: FrameProps) {
  const {
    id,
    draggable = true,
    resizable = true,
    title,
    icon,
    children,
    boundary,
    isDialog = false,
    isStatic = false,
    isActive = true,
    slots = {},
    slotProps = {},
    className,
    onClose,
    ...libProps
  } = props;
  // const { className, style } = useParseProps(styleProps);

  const [isSidebarOpen, , , toggleSidebar] = useToggle(slotProps.sidebar?.isInitiallyOpen);
  const [frame, frameRefHandler] = useRefState<HTMLDivElement>();
  const [dimension, setDimension] = useState<Dimension>();
  const [status, setStatus] = useState<FrameStatus>(FrameStatus.Normal);

  const isDraggable = status === FrameStatus.Normal && draggable;
  const isResizable = status === FrameStatus.Normal && resizable;

  useFrameDrag(id, setDimension, isDraggable, frame, boundary);
  useFrameResize(id, setDimension, isResizable, frame, boundary);

  const classes = useStyle();
  // const { headerHeight, footerHeight } = useFrameDimensions(frame);

  const toggleMaximize = useCallback(() => {
    setStatus((status) => (status === FrameStatus.Maximized ? FrameStatus.Normal : FrameStatus.Maximized));
  }, []);

  // useLayoutEffect(() => {
  //   if (frame && !dimension && !isStatic) {
  //     setTimeout(() => {
  //       setDimension(calcInitialFrameDimension(frame, isDialog, boundary));
  //     }, 5);
  //   }
  // }, [boundary, dimension, frame, isDialog, isStatic]);

  // const hasHeader = Boolean(slots.titlebar || slots.header || title || onClose);
  // const hasFooter = Boolean(slots.footer);
  // {
  //   [`frame--${status}`]: status,
  //   "frame--initialized": Boolean(dimension),
  //   "frame--dialog": isDialog,
  //   "frame--active": isActive,
  //   "frame--static": isStatic,
  //   "frame--sidebarOpen": isSidebarOpen,
  // }
  const hasTrigger = Boolean(slots.trigger);

  return (
    <FrameProvider dimension={dimension}>
      <Dialog open={hasTrigger ? undefined : true}>
        {/* {hasTrigger ? <DialogTrigger action="open">{slots.trigger}</DialogTrigger> : null} */}

        <DialogSurface className={classNames(classes.root, className)}>
          <DialogBody>
            <DialogTitle as="div" className={classes.titlebar}>
              {icon && <Icon name={icon} />}
              <Title className={classes.titlebarTitle} size="sm">
                {title}
              </Title>

              {slots.titlebar}

              <Box horizontal className={classes.titlebarControls} {...libProps}>
                {toggleMaximize && (
                  <Icon
                    className={classes.titlebarControlsIcon}
                    name={status === FrameStatus.Normal ? "FullScreenMaximize" : "FullScreenMinimize"}
                    onClick={toggleMaximize}
                  />
                )}

                {onClose && (
                  <DialogTrigger disableButtonEnhancement action="close">
                    <Icon className={classes.titlebarControlsIcon} disabled={!onClose} name="Dismiss" onClick={onClose} />
                  </DialogTrigger>
                )}
              </Box>
            </DialogTitle>

            <DialogContent className={classes.body}>
              <Box className={classes.headerPlaceholder} />
              {children}
            </DialogContent>

            {slots.footer && <DialogActions>{slots.footer}</DialogActions>}
          </DialogBody>
        </DialogSurface>

        {/* </DialogProvider> */}
      </Dialog>
    </FrameProvider>
  );
});
