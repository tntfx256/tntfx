export type Locale = {
  code: `${string}-${string}`;
  lang: string;
  country: string;
  countryCode: string;
  phoneCode: number;
  dir: "rtl" | "ltr";
  dateSep: "/" | "-";
  dateTimeSep: " ";
  timeSep: ":";
  daysOfMonths: [number, number, number, number, number, number, number, number, number, number, number, number];
  eclipseMonthIndex: number;
  monthNames: [string, string, string, string, string, string, string, string, string, string, string, string];
  monthNamesShort: [string, string, string, string, string, string, string, string, string, string, string, string];
  weekDays: [string, string, string, string, string, string, string];
  weekDaysShort: [string, string, string, string, string, string, string];
  am_pm: [string, string];
  defaultDateFormat: string;
  defaultDateTimeFormat: string;

  DateTime: DateConstructor;
};
