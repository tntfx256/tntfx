import type { TError } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import { Style } from "@tntfx/theme";

export type ErrorContentProps = {
  error?: TError;
};

export function ErrorContent(props: ErrorContentProps) {
  const { error } = props;

  if (!error) return null;

  const { message, status, name, code, description } = finalizeError(error);

  return (
    <div
      style={{
        position: "absolute",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          margin: "2rem",
          overflow: "auto",
          padding: "2rem",
          fontFamily: "monospace",
          borderRadius: "0.5rem",
          color: Style.tokens.palette.errorText,
          backdropFilter: "blur(0.5rem)",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Error</h1>
        <p className="message">{message || "Oops! Something went wrong!"}</p>
        {description && <p className="desc">{description}</p>}
        <pre className="details">{JSON.stringify({ code, name, status }, null, 2)}</pre>
      </div>
    </div>
  );
}
