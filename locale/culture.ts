import { Err } from "@tntfx/core";
import { i18n } from "i18next";
import type { Locale } from "./locale";
import { fallback } from "./locales/default";

export class Culture {
  protected static currentLocale = fallback.code;
  protected static locales: Map<string, Locale> = new Map([[fallback.code, fallback]]);

  static register(...locale: Locale[]) {
    // await i18n.
    // for (const loc of locale) {
    //   this.locales.set(loc.code, loc);
    // }
  }

  static switch(code: Locale["code"]) {
    if (!this.locales.has(code)) {
      Culture.currentLocale = code;
    }
    throw Err(Err.Name.RUNTIME, Err.Message.NOT_FOUND, `Locale ${code} not found`);
  }

  static get locale(): Locale {
    return Culture.locales.get(Culture.currentLocale)!;
  }

  static get dateInstance(): Date {
    return new Culture.locale.DateTime();
  }
}
