import {
  calcInitialFrameDimension,
  type ClassAndChildren,
  type Dimension,
} from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { useEffect, useState } from "react";
import { Sidebar } from "../../menu/sidebar/sidebar";
import { DialogProvider } from "../../popup/dialog/dialog-context";
import { Toolbar, ToolbarControls } from "../bar";
import { Box } from "../box";
import "./frame.scss";
import { FrameProps, FrameStatus } from "./types";
import { useFrameDimensions } from "./use-frame-dimensions";
import { useFrameDrag } from "./use-frame-drag";
import { useFrameResize } from "./use-frame-resize";

export function Frame(props: ClassAndChildren<FrameProps>) {
  const {
    id,
    draggable = true,
    resizable = true,
    title,
    icon,
    className,
    children,
    isDialog = false,
    isStatic = false,
    isActive = true,

    slots = {},
    // isSidebarOpen: isSidebarOpenExternal,
    // state,
    // status,
    boundary,
    // dimension,
    // onChange,
    // onSidebarToggle,
    onClose,
    style,
    ...boxProps
  } = props;

  // const [initiated, setInitiated] = useToggle();
  const [isSidebarOpen, , , toggleSidebar] = useToggle();
  const [frame, frameRefHandler] = useRefState<HTMLDivElement>();
  const [dimension, setDimension] = useState<Dimension>();
  const [frameStatus, setFrameStatus] = useState<FrameStatus>(
    FrameStatus.Normal
  );

  useFrameDrag({
    id,
    draggable,
    frameStatus,
    frameElement: frame,
    boundary,
    setDimension,
  });
  useFrameResize({
    id,
    resizable,
    frameStatus,
    frameElement: frame,
    boundary,
    setDimension,
  });

  const { headerHeight, footerHeight } = useFrameDimensions(frame);

  function handleToggleMaximize() {
    if (resizable) {
      setFrameStatus((status) =>
        status === FrameStatus.Maximized
          ? FrameStatus.Normal
          : FrameStatus.Maximized
      );
    }
  }

  useEffect(() => {
    if (frame && !dimension && !isStatic) {
      // const dimension = frame.getBoundingClientRect();
      const dimension = calcInitialFrameDimension(boundary);
      // console.log("EFFECT", dimension);
      // setInitiated();
      setDimension(dimension);
    }
  }, [boundary, dimension, frame, isStatic]);

  const hasHeader = Boolean(slots.titlebar || slots.header || title || onClose);

  return (
    <Box
      className={classNames(
        "frame",
        { _dialog: isDialog, active: isActive },
        `status-${frameStatus}`,

        className
      )}
      draggable={draggable}
      ref={frameRefHandler}
      resizable={resizable}
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
              <div
                className="frame-sidebar-placeholder"
                style={{
                  height: headerHeight,
                  minHeight: headerHeight,
                  maxHeight: headerHeight,
                }}
              />
              {slots.sidebar}
            </Sidebar>
          )}

          <Box className="frame-content">
            {hasHeader && (
              <Box
                className={classNames("frame-header", [className, "-header"])}
              >
                <Toolbar
                  as="header"
                  icon={slots.sidebar ? "sidebar" : icon}
                  onIconClick={slots.sidebar ? toggleSidebar : undefined}
                  title={title}
                >
                  {slots.titlebar}
                  <ToolbarControls
                    frameStatus={frameStatus}
                    onClose={onClose}
                    onToggleMaximize={
                      resizable ? handleToggleMaximize : undefined
                    }
                  />
                </Toolbar>
                {slots.header}
              </Box>
            )}

            <Box className={classNames("frame-body", [className, "-body"])}>
              <div style={{ minHeight: headerHeight }} />
              {children}
            </Box>

            {slots.footer && (
              <Toolbar
                as="footer"
                className={classNames("frame-footer", [className, "-footer"])}
              >
                {slots.footer}
              </Toolbar>
            )}
          </Box>
        </Box>
      </DialogProvider>
    </Box>
  );
}
