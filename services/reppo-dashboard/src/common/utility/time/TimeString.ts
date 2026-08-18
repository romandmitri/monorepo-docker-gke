import { getDateAsDate, getDateAsTime } from "@/src/common/utility/time/Date.ts";
import { DateString, DateStringFormat } from "@/src/common/utility/time/DateString.ts";
import { TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.ts";
import { TimeUnix, useTimeUnixAsLocaleDateTime } from "@/src/common/utility/time/TimeUnix.ts";
import { getTimeZoneFromBrowser } from "@/src/common/utility/time/TimeZone.ts";
import { addMilliseconds, parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz"; // 2023-05-18T11:05:48.086734Z

// 2023-05-18T11:05:48.086734Z
export type TimeString = string;

// https://carl-topham.com/articles/javascript-user-locale

export const getTimeStringAsDate = (ds: TimeString): string => getDateAsDate(new Date(ds));
export const getTimeStringAsTime = (ds: TimeString): string => getDateAsTime(new Date(ds));

export const getTimeStringLocalDatetime = (timeString?: TimeString): string | undefined => {
	if (!timeString) return;
	const d = new Date(timeString);
	const t = d.getTime() / 1000;
	return useTimeUnixAsLocaleDateTime(t);
};

export const getTimeStringAsTimeUnix = (ds: TimeString | undefined): TimeUnix | undefined => {
	if (!ds) return;
	return Date.parse(ds);
};

export const getTimeStringFromDateString_AtEndOfDay = (from: DateString | undefined): TimeString | undefined => {
	if (!from) return;
	const d1 = parse(from, DateStringFormat, new Date());
	const d2 = addMilliseconds(d1, TimeMillisecond.Day - 1);
	const t = fromZonedTime(d2, getTimeZoneFromBrowser() as string);
	return t.toISOString();
};

export const getTimeStringFromTimeStamp = (t: TimeUnix): TimeString => {
	const d = new Date(t);
	return d.toISOString();
};
