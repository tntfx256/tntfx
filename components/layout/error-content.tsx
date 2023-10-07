import type { ERROR } from "@tntfx/core";
import { finalizeError } from "@tntfx/core";
import "./error-content.scss";

export type ErrorContentProps = {
  error?: ERROR;
};

export function ErrorContent(props: ErrorContentProps) {
  const { error } = props;

  if (!error) return null;

  const { message, status, name, code, description } = finalizeError(error);

  return (
    <div className="box">
      <p className="message">{message || "Oops! Something went wrong!"}</p>
      {description && <p className="desc">{description}</p>}
      <pre className="details">{JSON.stringify({ code, name, status }, null, 2)}</pre>
    </div>
  );
}
