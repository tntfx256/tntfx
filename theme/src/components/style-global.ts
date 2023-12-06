import { makeStaticStyles as styled } from "@fluentui/react-components";
import { tokens } from "./tokens";

export const useGlobalStyle = styled(`
  ::placeholder {
    filter: opacity(0.25);
  }

  html,
  body {
    width: 100%;
    height: 100%;
    min-width: ${tokens.breakpoint.xs};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
    background-color: ${tokens.palette.primary};
  }

  html {
    overflow: hidden;
    max-width: 100vw;
    max-height: 100vh;    
  }

  body {
    position: relative;
    display: flex;    
    max-width: 100%;
    min-height: 100%;
    flex-direction: column;
    padding: 0;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    overflow-x: hidden;
    overflow-y: auto;
    font-family: inherit;

    ${tokens.mediaQueries.belowSupported} {
      overflow-x: auto;
    }

    .appRoot {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      font-family: inherit !important;
      /* min-height: 100%;
      min-width: 100%;
      width: 100%;
      height: 100%; */
    }
  }

  pre,
  code {
    font-family: ${tokens.fontFamilyMono};
    font-size: ${tokens.fontSize.sm};
    white-space: pre;
  }  
`);
