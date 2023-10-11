import type { Any } from "@tntfx/core";
import { isParsedResponse, parseResponse } from "./utils";

type UseResponseHandlerProps = {
  // popupType?: PopupType;
};

export function useResponseHandler(props?: UseResponseHandlerProps) {
  // const popup = usePopup();

  return (response: Any, successCallback?: (data: Any) => void) => {
    const result = isParsedResponse(response) ? response : parseResponse(response);

    if (result.error) {
      // if (props?.popupType === "dialog") {
      //   popup.showMessageBox(null, result.error);
      // } else {
      //   popup.showToast(null, result.error);
      // }
      return;
    }
    successCallback?.(result.data);
  };
}
