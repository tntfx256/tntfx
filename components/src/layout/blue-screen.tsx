import type { CSSProperties } from "react";
import type { TError } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import { useToggle } from "../hooks";

/**
 * BlueScreen should not use any component
 */

export type BlueScreenProps = {
  error: TError;
  reset?: () => void;
};

export function BlueScreen(props: BlueScreenProps) {
  const { error: rawError, reset } = props;

  const [isErrorDetailVisible, showDetails, hideDetails] = useToggle();
  const { name, message, description, originalName, code, stack, status } = finalizeError(rawError);

  return (
    <div style={wrapperStyle}>
      <h1 style={titleStyle}>:(</h1>

      <h2 style={subtitleStyle}>
        {name} <br />
        <small>{originalName}</small>
      </h2>

      {code && <p style={textStyle}>Code: {code}</p>}
      {status && <p style={textStyle}>Status: {status}</p>}

      <p style={textStyle}>Message: {message}</p>

      {description && <p style={textStyle}>Description: {description}</p>}

      {reset && (
        <span style={ctaStyle} onClick={reset}>
          Try again
        </span>
      )}

      {isErrorDetailVisible ? (
        <>
          <span style={ctaStyle} onClick={hideDetails}>
            Hide details
          </span>
          <pre style={preStyle}>{isErrorDetailVisible ? stack : ""}</pre>
        </>
      ) : (
        <span style={ctaStyle} onClick={showDetails}>
          Show details
        </span>
      )}
    </div>
  );
}

const wrapperStyle: CSSProperties = {
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  alignItems: "flex-start",
  background: "#0070d5",
  color: "#f5f5f5",
  justifyContent: "flex-start",
  padding: "1rem",
};

const titleStyle: CSSProperties = {
  fontSize: "4rem",
  fontWeight: "bold",
  margin: "1rem 0",
};

const subtitleStyle: CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "normal",
  padding: "1rem 0",
};

const textStyle: CSSProperties = {
  fontSize: "1rem",
  padding: "0.5rem 0",
};

const ctaStyle: CSSProperties = {
  textDecoration: "underline",
  display: "block",
  padding: ".5rem 0",
};

const preStyle: CSSProperties = {
  maxWidth: "100%",
  whiteSpace: "pre-line",
  fontSize: "0.75rem",
  flex: 1,
  overflow: "auto",
  padding: ".5rem",
  border: ".5px solid #ccccccdd",
  borderRadius: ".25rem",
};
