import type { PropsAndChildren } from "@tntfx/core";
import { Sidebar } from "../menu/sidebar/sidebar";

type SplitViewProps = PropsAndChildren & {
  className?: string;
  sideContent: PropsAndChildren["children"];
  isSideVisible?: boolean;
};

export function SplitView(props: SplitViewProps) {
  const { children, isSideVisible, sideContent, ...libProps } = props;

  return (
    <div {...libProps}>
      <Sidebar open={isSideVisible}>{sideContent}</Sidebar>

      <div className="content">{children}</div>
    </div>
  );
}
