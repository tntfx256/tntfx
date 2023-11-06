import { useCallback, useLayoutEffect, useState } from "react";
import { type Dimension } from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { classNames, parseProps } from "@tntfx/theme";
import { FrameControls } from "./frame-controls";
import { FrameProvider } from "./frame-provider";
import type { FrameProps } from "./types";
import { FrameStatus } from "./types";
import { useFrameDimensions } from "./use-frame-dimensions";
import { useFrameDrag } from "./use-frame-drag";
import { useFrameResize } from "./use-frame-resize";
import { Sidebar } from "../../menu";
import { DialogProvider } from "../../popup/dialog/dialog-context";
import { Toolbar } from "../bar";
import { Box } from "../box";
import "./frame.scss";

export function Frame(props: FrameProps) {
  const { draggable = true, resizable = true } = props;

  const [
    className,
    {
      id,
      title,
      icon,
      children,
      boundary,
      style,
      isDialog = false,
      isStatic = false,
      isActive = true,
      slots = {},
      onClose,
      ...boxProps
    },
  ] = parseProps(props);

  const [isSidebarOpen, , , toggleSidebar] = useToggle();
  const [frame, frameRefHandler] = useRefState<HTMLDivElement>();
  const [dimension, setDimension] = useState<Dimension>();
  const [status, setStatus] = useState<FrameStatus>(FrameStatus.Normal);

  const isDraggable = status === FrameStatus.Normal && draggable;
  const isResizable = status === FrameStatus.Normal && resizable;

  useFrameDrag(id, setDimension, isDraggable, frame, boundary);
  useFrameResize(id, setDimension, isResizable, frame, boundary);

  const { headerHeight, footerHeight } = useFrameDimensions(frame);

  const toggleMaximize = useCallback(() => {
    setStatus((status) => (status === FrameStatus.Maximized ? FrameStatus.Normal : FrameStatus.Maximized));
  }, []);

  useLayoutEffect(() => {
    if (frame && !dimension && !isStatic) {
      let { left, top, width, height } = frame.getBoundingClientRect();
      if (boundary) {
        left -= boundary.left;
        top -= boundary.top;
      }
      setDimension({ left, top, width, height });
    }
  }, [boundary, dimension, frame, isStatic]);

  const hasHeader = Boolean(slots.titlebar || slots.header || title || onClose);
  const hasFooter = Boolean(slots.footer);

  return (
    <FrameProvider dimension={dimension}>
      <Box
        ref={frameRefHandler}
        className={classNames("frame", className, {
          [`frame--${status}`]: status,
          "frame--initialized": Boolean(dimension),
          "frame--dialog": isDialog,
          "frame--active": isActive,
          "frame--static": isStatic,
        })}
        style={
          dimension
            ? {
                top: dimension.top,
                left: dimension.left,
                width: dimension.width,
                height: dimension.height,
                ...style,
              }
            : style
        }
        {...boxProps}
      >
        <DialogProvider>
          <Box className="frame__wrapper">
            {slots.sidebar && (
              <Sidebar className={classNames("frame__sidebar")} isOpen={isSidebarOpen} overlay={false}>
                {hasHeader && <div style={{ minHeight: headerHeight }} />}
                {slots.sidebar}
                {hasFooter && <div style={{ minHeight: footerHeight }} />}
              </Sidebar>
            )}
            <Box className="frame__content">
              {hasHeader && (
                <Box className={classNames("frame__header")}>
                  <Toolbar
                    icon={slots.sidebar ? "sidebar" : icon}
                    title={title}
                    onIconClick={slots.sidebar ? toggleSidebar : undefined}
                  >
                    {slots.titlebar}
                    {!isStatic && (
                      <FrameControls
                        frameStatus={status}
                        onClose={onClose}
                        onToggleMaximize={resizable ? toggleMaximize : undefined}
                      />
                    )}
                  </Toolbar>
                  {slots.header}
                </Box>
              )}

              <Box className={classNames("frame__body", [className, "__body"])}>
                {hasHeader && <div style={{ minHeight: headerHeight }} />}
                {children}
                {hasFooter && <div style={{ minHeight: footerHeight }} />}
              </Box>

              {hasFooter && <Toolbar className={classNames("frame__footer")}>{slots.footer}</Toolbar>}
            </Box>
          </Box>
        </DialogProvider>
      </Box>
    </FrameProvider>
  );
}
