import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { classNames } from "@tntfx/theme";

type MarkdownProps = {
  className?: string;
  children?: ReactNode;
};

export function Markdown(props: MarkdownProps) {
  const { className, children } = props;

  return <ReactMarkdown className={classNames("markdown", className)}>{children as string}</ReactMarkdown>;
}
