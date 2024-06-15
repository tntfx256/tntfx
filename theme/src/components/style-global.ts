import { makeStaticStyles as styled } from "@fluentui/react-components";
import { tokens } from "./tokens";

export const useGlobalStyle = styled(`
  ::placeholder {
    filter: opacity(0.25);
  }

  html,
  body {
    min-width: ${tokens.breakpoint.xs};
    background-color: ${tokens.palette.primary};
  }

  body {
    ${tokens.mediaQueries.belowSupported} {
      overflow-x: auto;
    }
  }

  pre,
  code {
    font-family: ${tokens.fontFamilyMono};
    font-size: ${tokens.fontSize.sm};
  }
`);
