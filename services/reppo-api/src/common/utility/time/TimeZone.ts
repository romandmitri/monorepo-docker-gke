// IANA timezone, ie: America/Toronto
export type TimeZone = Exclude<Intl.DateTimeFormatOptions["timeZone"], undefined>;
