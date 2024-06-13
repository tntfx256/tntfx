import type { PropsWithChildren } from "react";
import type { TObject } from "@tntfx/core";
import { createStore } from "./store";

type Locale = {
  name: string;
  // calendar
  // dateTime formatter
  // injectable dictionary
  dictionary: TObject<string>;
};

type IntlState = {
  locales: Locale[];
  selectedLocale: number;
};

const { StoreProvider } = createStore<IntlState>({ name: "intl", persist: { version: "0.0.0" } });

export function IntlProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <StoreProvider locales={[]} selectedLocale={0}>
      {children}
    </StoreProvider>
  );
}

// export function useIntl() {
//   const { locale, dictionary } = useContext(intlContext);

//   const tr = useCallback(
//     (key: string, ...values: (number | string)[]) => {
//       if (!key) return "";

//       key = key.toLowerCase();
//       const entry = dictionary[key];
//       if (!entry) return `[${key}]`;

//       return values.reduce<string>((tr, val) => tr.replace("%s", val.toString()), entry);
//     },
//     [dictionary]
//   );

//   return { locale, tr };
// }
