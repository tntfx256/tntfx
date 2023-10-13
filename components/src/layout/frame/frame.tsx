import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { type Boundary, calcInitialFrameDimension, type ClassAndChildren, type Dimension, type IconName } from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { FrameStatus } from "./types";
import { useFrameDimensions } from "./use-frame-dimensions";
import { Icon } from "../../icon";
import { Sidebar } from "../../menu/sidebar";
import { Toolbar } from "../../menu/toolbar";
import { DialogProvider } from "../../popup/dialog/dialog-context";
import { Text } from "../../typography";
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

  const [initiated, setInitiated] = useToggle();
  const [isSidebarOpen, , , toggleSidebar] = useToggle();
  const [frame, frameRefHandler] = useRefState<HTMLDivElement>();
  const [dimension, setDimension] = useState<Dimension>(() => calcInitialFrameDimension(boundary));
  const [frameStatus, setFrameStatus] = useState<FrameStatus>(FrameStatus.Normal);

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
    if (frame && !initiated) {
      const dimension = frame.getBoundingClientRect();
      setDimension(dimension);
      // onChange({ id, type: "init", dimension });
      setInitiated();
    }
  }, [frame, initiated, setInitiated]);

  return (
    <Box
      className={classNames("frame", `status-${status}`, className, { _initiated: initiated })}
      draggable={draggable}
      ref={frameRefHandler}
      resizable={resizable}
      style={initiated ? dimension : undefined}
    >
      <DialogProvider>
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
              <Toolbar>
                <Toolbar.Title>
                  {slots.sidebar ? <Icon name="sidebar" onClick={toggleSidebar} /> : <Icon name={icon || "apps"} />}
                  {title && <Text size="large">{title}</Text>}
                </Toolbar.Title>

                <Toolbar.Section>{slots.titlebar}</Toolbar.Section>

                <Toolbar.Control>
                  <Icon
                    disabled={isDialog}
                    name={frameStatus === "maximized" ? "restoreMaximize" : "maximize"}
                    // onClick={() => onChange({ id, type: status === "maximized" ? "restore" : "maximize" })}
                  />

                  <Icon
                    name="cross"
                    // onClick={() => onChange({ id, type: "close" })}
                  />
                </Toolbar.Control>
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

            {slots.footer && <Box className={classNames("frame-footer", [className, "-footer"])}>{slots.footer}</Box>}
          </Box>
        </Box>
      </DialogProvider>
    </Box>
  );
}
