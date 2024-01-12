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
        border: `1px solid ${Style.tokens.palette.errorText}`,
        borderRadius: "0.5rem",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        backdropFilter: "blur(0.5rem)",
        fontFamily: "monospace",
        color: Style.tokens.palette.errorText,
        padding: "2rem",
      }}
    >
      <div style={{ overflow: "auto", flex: 1 }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Error</h1>
        <p className="message">{message || "Oops! Something went wrong!"}</p>
        {description && <p className="desc">{description}</p>}
        <pre className="details">{JSON.stringify({ code, name, status }, null, 2)}</pre>
      </div>
    </div>
  );
}
