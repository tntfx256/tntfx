import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { type Boundary, type ClassAndChildren, type Dimension, type IconName } from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { FrameStatus } from "./types";
import { useFrameDimensions } from "./use-frame-dimensions";
import { Sidebar } from "../../menu/sidebar/sidebar";
import { Toolbar } from "../bar";
import { Box } from "../box";
import "./frame.scss";

export interface FrameProps {
  // isSidebarOpen?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  title?: string;
  icon?: IconName;
  boundary?: Boundary;
  isDialog?: boolean;
  // slots
  slots?: {
    header?: ReactNode;
    titlebar?: ReactNode;
    sidebar?: ReactNode;
    footer?: ReactNode;
  };
  onClose?: () => void;
  // headerSlot?: ReactNode;
  // titlebarSlot?: ReactNode;
  // sidebarSlot?: ReactNode;
  // footerSlot?: ReactNode;
  //
  // onChange: (event: FrameEvent) => void;
  // onSidebarToggle?: () => void;
}

export function Frame(props: ClassAndChildren<FrameProps>) {
  const {
    // id,
    draggable,
    resizable,
    title,
    icon,
    className,
    children,
    isDialog,
    slots = {},

    // isSidebarOpen: isSidebarOpenExternal,
    // state,
    // status,
    boundary,
    // dimension,
    // onChange,
    // onSidebarToggle,
    onClose,
  } = props;

  // const [initiated, setInitiated] = useToggle();
  const [isSidebarOpen, , , toggleSidebar] = useToggle();
  const [frame, frameRefHandler] = useRefState<HTMLDivElement>();
  const [dimension, setDimension] = useState<Dimension>();
  // const [frameStatus, setFrameStatus] = useState<FrameStatus>(FrameStatus.Normal);

  // useFrameDrag({ draggable, frameStatus, frameElement: frame, boundary, isDialog, setDimension });
  // useFrameResize({ resizable, frameStatus, frameElement: frame, boundary, isDialog, setDimension });

  const { headerHeight, footerHeight } = useFrameDimensions(frame);

  // const toggleSidebar = useCallback((isVisible?: boolean) => {
  //   if (isVisible) {
  //     showSidebar();
  //   } else {
  //     hideSidebar();
  //   }
  // }, []);

  // useEffect(() => {
  //   toggleSidebar(isSidebarOpenExternal);
  // }, [isSidebarOpenExternal]);

  // const handleSidebarToggle = useCallback(() => {
  //   if (onSidebarToggle) {
  //     onSidebarToggle();
  //   } else {
  //     toggleSidebar(!isSidebarOpenInternal);
  //   }
  // }, [onSidebarToggle, isSidebarOpenInternal]);

  useEffect(() => {
    if (frame && !dimension) {
      const dimension = frame.getBoundingClientRect();
      // const dimension = calcInitialFrameDimension(boundary);
      console.log("EFFECT", dimension);
      // setInitiated();
      setDimension(dimension);
    }
  }, [boundary, dimension, frame]);

  return (
    <Box
      className={classNames("frame", { _dialog: isDialog }, className)}
      draggable={draggable}
      ref={frameRefHandler}
      resizable={resizable}
      // style={
      //   dimension
      //     ? { top: dimension.top, left: dimension.left, width: dimension.width, height: dimension.height }
      //     : undefined
      // }
    >
      {/* <DialogProvider> */}
      <Box className="frame-wrapper">
        {slots.sidebar && (
          <Sidebar className={classNames("frame-sidebar", [className, "-sidebar"])} isOpen={isSidebarOpen} overlay={false}>
            <div
              className="frame-sidebar-placeholder"
              style={{ height: headerHeight, minHeight: headerHeight, maxHeight: headerHeight }}
            />
            {slots.sidebar}
          </Sidebar>
        )}

        <Box className="frame-content">
          <Box className={classNames("frame-header", [className, "-header"])}>
            <Toolbar as="header" icon={slots.sidebar ? "sidebar" : icon} title={title} onClose={onClose}>
              {slots.titlebar}
            </Toolbar>
            {slots.header}
          </Box>

          <Box className={classNames("frame-body", [className, "-body"])}>
            {children}
            <div
              className="frame-footer-placeholder"
              style={{ height: footerHeight, minHeight: footerHeight, maxHeight: footerHeight }}
            />
          </Box>

          {slots.footer && (
            <Toolbar as="footer" className={classNames("frame-footer", [className, "-footer"])}>
              {slots.footer}
            </Toolbar>
          )}
        </Box>
      </Box>
      {/* </DialogProvider> */}
    </Box>
  );
}
