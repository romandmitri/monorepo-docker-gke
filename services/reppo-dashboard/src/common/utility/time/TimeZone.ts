// IANA timezone, ie: America/Toronto
export type TimeZone = Intl.DateTimeFormatOptions["timeZone"];

export const getTimeZoneFromBrowser = (): TimeZone => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
