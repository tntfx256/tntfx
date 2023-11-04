import { calcInitialFrameDimension, type Dimension } from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { classNames, parseProps } from "@tntfx/theme";
import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "../../menu";
import { DialogProvider } from "../../popup/dialog/dialog-context";
import { Toolbar } from "../bar";
import { Box } from "../box";
import { FrameControls } from "./frame-controls";
import { FrameProvider } from "./frame-provider";
import { FrameProps, FrameStatus } from "./types";
import { useFrameDimensions } from "./use-frame-dimensions";
import { useFrameDrag } from "./use-frame-drag";
import { useFrameResize } from "./use-frame-resize";
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

  useEffect(() => {
    if (frame && !dimension && !isStatic) {
      const dimension = calcInitialFrameDimension(isDialog, boundary);
      setDimension(dimension);
    }
  }, [boundary, dimension, frame, isStatic]);

  const hasHeader = Boolean(slots.titlebar || slots.header || title || onClose);

  return (
    <FrameProvider dimension={dimension}>
      <Box
        ref={frameRefHandler}
        className={classNames("frame", `status-${status}`, className, { active: isActive, static: isStatic })}
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
          <Box className="frame-wrapper">
            {slots.sidebar && (
              <Sidebar
                className={classNames("frame-sidebar", [className, "-sidebar"])}
                isOpen={isSidebarOpen}
                overlay={false}
              >
                <div className="frame-sidebar-placeholder" style={{ minHeight: headerHeight }} />
                {slots.sidebar}
              </Sidebar>
            )}
            <Box className="frame-content">
              {hasHeader && (
                <Box className={classNames("frame-header")}>
                  <Toolbar
                    as="header"
                    icon={slots.sidebar ? "sidebar" : icon}
                    onIconClick={slots.sidebar ? toggleSidebar : undefined}
                    title={title}
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

              <Box className={classNames("frame-body", [className, "-body"])}>
                <div style={{ minHeight: headerHeight }} />
                {children}
              </Box>

              {slots.footer && (
                <Toolbar as="footer" className={classNames("frame-footer", [className, "-footer"])}>
                  {slots.footer}
                </Toolbar>
              )}
            </Box>
          </Box>
        </DialogProvider>
      </Box>
    </FrameProvider>
  );
}
