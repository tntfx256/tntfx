import { useCallback, useId, useState } from "react";
import type { DialogOpenChangeData, DialogOpenChangeEvent } from "@fluentui/react-components";
import {
  Dialog as LibDialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";
import { memoize } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { useStyle } from "./dialog.style";
import type { DialogProps } from "./types";
import { DialogStatus } from "./types";
import { useRuntime } from "../../hooks";
import { Icon } from "../../icon";
import { Box, useActions } from "../../layout";

export { DialogTrigger } from "@fluentui/react-components";

export const Dialog = memoize(function Dialog(props: DialogProps) {
  const {
    // draggable,
    resizable,
    title,
    icon,
    children,
    // boundary,
    slots = {},
    // slotProps = {},
    className,
    onClose,
    actions,
    onAction,
    open,
    // style,
    ...libProps
  } = props;
  // const { className, style } = useParseProps(styleProps);

  const dialogId = useId();
  const id = props.id || dialogId;
  const runtime = useRuntime();
  // const [isSidebarOpen, , , toggleSidebar] = useToggle(slotProps.sidebar?.isInitiallyOpen);
  // const [frame, frameRefHandler] = useRefEffect<HTMLDivElement>();
  // const [titlebar, titlebarRefHandler] = useRefEffect<HTMLDivElement>();
  // const [dimension, setDimension] = useState<Dimension>();
  const [status, setStatus] = useState<DialogStatus>(DialogStatus.Normal);

  // const isDraggable = status === DialogStatus.Normal && draggable;
  // const isResizable = status === DialogStatus.Normal && resizable;

  // useFrameDrag(id, setDimension, isDraggable, frame, titlebar, boundary);
  // useFrameResize(id, setDimension, isResizable, frame, boundary);

  const classes = useStyle();
  // const { headerHeight, footerHeight } = useFrameDimensions(frame);

  const toggleMaximize = useCallback(() => {
    setStatus((status) => (status === DialogStatus.Maximized ? DialogStatus.Normal : DialogStatus.Maximized));
  }, []);

  const handleClose = useCallback(
    (event: DialogOpenChangeEvent, data: DialogOpenChangeData) => {
      if (!data.open) {
        onClose?.();
      }
    },
    [onClose]
  );

  // useEffect(() => {
  //   if (frame && !dimension) {
  //     setTimeout(() => {
  //       setDimension(toDimension(frame.getBoundingClientRect()));
  //     }, 5);
  //   }
  // }, [boundary, dimension, frame]);

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
  const isActive = id && runtime.isActive(id);
  const actionBar = useActions(actions, onAction);

  return (
    // <DialogProvider>
    <LibDialog open={open} onOpenChange={handleClose} {...libProps}>
      <DialogTrigger disableButtonEnhancement action="open">
        {slots.trigger}
      </DialogTrigger>

      <DialogSurface
        className={classNames(classes.root, isActive && classes.active, className)}
        // ref={frameRefHandler}
        // style={{
        //   ...dimension,
        //   ...style,
        // }}
      >
        <DialogBody className={classes.wrapper}>
          <DialogTitle
            className={classes.titlebar}
            // ref={titlebarRefHandler}
            title={title}
          >
            {icon && <Icon name={icon} />}
            {title}
            {slots.titlebar}

            <Box horizontal className={classes.titlebarControls}>
              {resizable && (
                <Icon
                  className={classes.titlebarControlsIcon}
                  name={status === DialogStatus.Normal ? "FullScreenMaximize" : "FullScreenMinimize"}
                  onClick={toggleMaximize}
                />
              )}

              {onClose && (
                <DialogTrigger disableButtonEnhancement action="close">
                  <Icon
                    className={classNames(classes.titlebarControlsIcon, classes.titlebarCloseIcon)}
                    disabled={!onClose}
                    name="Dismiss"
                    onClick={onClose}
                  />
                </DialogTrigger>
              )}
            </Box>
          </DialogTitle>

          <DialogContent className={classes.body}>
            <Box className={classes.headerPlaceholder} />
            {children}
          </DialogContent>

          <DialogActions className={classes.footer}>{slots.footer || actionBar}</DialogActions>
        </DialogBody>
      </DialogSurface>
    </LibDialog>
    // </DialogProvider>
  );
});
