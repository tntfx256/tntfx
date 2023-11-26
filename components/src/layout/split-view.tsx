import type { PropsAndChildren } from "@tntfx/core";
import { classNames } from "@tntfx/theme";
import { Sidebar } from "../menu/sidebar/sidebar";
import "./split-view.scss";

type SplitViewProps = PropsAndChildren & {
  className?: string;
  sideContent: PropsAndChildren["children"];
  isSideVisible?: boolean;
};

export function SplitView(props: SplitViewProps) {
  const { className, children, isSideVisible, sideContent } = props;

  return (
    <div className={classNames("split-view", className, { "side-visible": isSideVisible })}>
      <Sidebar blur persistent isOpen={isSideVisible} overlay={false}>
        {sideContent}
      </Sidebar>

      <div className="content">{children}</div>
    </div>
  );
}
