import ReactMarkdown from "react-markdown";
import type { PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";

export function Markdown(props: PropsAndChildren) {
  const { className, children } = props;

  return <ReactMarkdown className={classNames("markdown", className)}>{children as string}</ReactMarkdown>;
}
