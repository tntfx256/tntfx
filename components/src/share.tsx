import { useState } from "react";
import { Icon } from "@tntfx/icons";
import { classNames } from "@tntfx/theme";

export type ShareProps = {
  url: string;
  title: string;
  text: string;
};

export function Share(props: ShareProps) {
  const { url, title, text } = props;

  // const popup = useToast();
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(url || text || title).catch(() => 0);
    // popup.showToast({ title: "Copy to clipboard", type: "info" });
    setIsCopied(true);
  }

  async function handleShare() {
    try {
      await navigator.share(props);
    } catch (error) {
      // popup.showToast(null, finalizeError(error));
    }
  }

  if ("canShare" in navigator && navigator.canShare()) {
    return <Icon className={classNames("share")} name="share" onClick={handleShare} />;
  }

  return <Icon className={classNames("share", { done: isCopied })} name="copy" onClick={handleCopyToClipboard} />;
}
