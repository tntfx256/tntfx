import type { ReactNode } from "react";
import { useCallback, useEffect } from "react";
import type { Boundary, ClassAndChildren, Container, IconName } from "@tntfx/core";
import { useRefState, useToggle } from "@tntfx/hooks";
import { classNames } from "@tntfx/theme";
import { useFrameDimensions } from "./use-frame-dimensions";
import { useFrameDrag } from "./use-frame-drag";
import { useFrameResize } from "./use-frame-resize";
import type { FrameEvent } from "./utils";
import { Icon } from "../../icon";
import { Sidebar } from "../../menu/sidebar";
import { Toolbar } from "../../menu/toolbar";
import { DialogProvider } from "../../popup/dialog/dialog-context";
import { Text } from "../../typography";
import { Box } from "../box";
import "./frame.scss";

export interface FrameProps extends ClassAndChildren, Omit<Container, "entity"> {
  isSidebarOpen?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  title?: string;
  icon?: IconName;
  boundary?: Boundary;
  isDialog?: boolean;
  // slots
  headerSlot?: ReactNode;
  titlebarSlot?: ReactNode;
  sidebarSlot?: ReactNode;
  footerSlot?: ReactNode;
  //
  onChange: (event: FrameEvent) => void;
  onSidebarToggle?: () => void;
}

export function Frame(props: FrameProps) {
  const {
    id,
    draggable,
    resizable,
    headerSlot,
    titlebarSlot,
    title,
    icon,
    footerSlot,
    sidebarSlot,
    className,
    children,
    isSidebarOpen: isSidebarOpenExternal,
    state,
    status,
    boundary,
    dimension,
    isDialog,
    onChange,
    onSidebarToggle,
  } = props;

  const [initiated, setInitiated] = useToggle();
  const [isSidebarOpenInternal, showSidebar, hideSidebar] = useToggle(!!isSidebarOpenExternal);
  const [frame, frameRefHandler] = useRefState<HTMLDivElement>();

  useFrameDrag({ id, draggable, status, frameElement: frame, boundary, isDialog, onChange });
  useFrameResize({ id, resizable, status, frameElement: frame, boundary, isDialog, onChange });
  const { headerHeight, footerHeight } = useFrameDimensions(frame);

  const toggleSidebar = useCallback((isVisible?: boolean) => {
    if (isVisible) {
      showSidebar();
    } else {
      hideSidebar();
    }
  }, []);

  useEffect(() => {
    toggleSidebar(isSidebarOpenExternal);
  }, [isSidebarOpenExternal]);

  const handleSidebarToggle = useCallback(() => {
    if (onSidebarToggle) {
      onSidebarToggle();
    } else {
      toggleSidebar(!isSidebarOpenInternal);
    }
  }, [onSidebarToggle, isSidebarOpenInternal]);

  useEffect(() => {
    if (frame && !initiated) {
      const dimension = frame.getBoundingClientRect();
      onChange({ id, type: "init", dimension });
      setInitiated();
    }
  }, [frame, initiated]);

  return (
    <Box
      className={classNames("frame", `status-${status}`, className, { _active: state === "active", _initiated: initiated })}
      draggable={draggable}
      id={id}
      ref={frameRefHandler}
      resizable={resizable}
      style={initiated ? dimension : undefined}
    >
      <DialogProvider>
        <Box className="frame-wrapper">
          {sidebarSlot && (
            <Sidebar
              className={classNames("frame-sidebar", [className, "-sidebar"])}
              isOpen={isSidebarOpenInternal}
              overlay={false}
            >
              <div
                className="frame-sidebar-placeholder"
                style={{ height: headerHeight, minHeight: headerHeight, maxHeight: headerHeight }}
              />
              {sidebarSlot}
            </Sidebar>
          )}

          <Box className="frame-content">
            <Box className={classNames("frame-header", [className, "-header"])}>
              <Toolbar>
                <Toolbar.Title>
                  {!!sidebarSlot ? <Icon name="sidebar" onClick={handleSidebarToggle} /> : <Icon name={icon || "apps"} />}
                  {title && <Text size="large">{title}</Text>}
                </Toolbar.Title>

                <Toolbar.Section>{titlebarSlot}</Toolbar.Section>

                <Toolbar.Control>
                  <Icon disabled={isDialog} name="minimize" onClick={() => onChange({ id, type: "minimize" })} />

                  <Icon
                    disabled={isDialog}
                    name={status === "maximized" ? "restoreMaximize" : "maximize"}
                    onClick={() => onChange({ id, type: status === "maximized" ? "restore" : "maximize" })}
                  />

                  <Icon name="cross" onClick={() => onChange({ id, type: "close" })} />
                </Toolbar.Control>
              </Toolbar>
              {headerSlot}
            </Box>

            <Box className={classNames("frame-body", [className, "-body"])}>
              {children}
              <div
                className="frame-footer-placeholder"
                style={{ height: footerHeight, minHeight: footerHeight, maxHeight: footerHeight }}
              />
            </Box>

            {footerSlot && <Box className={classNames("frame-footer", [className, "-footer"])}>{footerSlot}</Box>}
          </Box>
        </Box>
      </DialogProvider>
    </Box>
  );
}
