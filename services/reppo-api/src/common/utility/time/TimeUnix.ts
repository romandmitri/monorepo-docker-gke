import { DateTimeString } from "@/src/common/utility/time/DateTimeString.js";
import { TimeZone } from "@/src/common/utility/time/TimeZone.js";

export type TimeUnix = EpochTimeStamp;

export const getTimeUnixAsLocaleDate = (time: TimeUnix | undefined, tz: TimeZone | undefined): string | undefined => {
	if (!time) return;
	// const tc = useContext(TranslationContext);
	const language = "en-CA";
	const d = new Date(time);
	return d.toLocaleDateString(language, {
		month: "short", // "2-digit",
		day: "numeric", // "2-digit",
		timeZone: tz ?? "Canada/Eastern",
	});
};

export const getTimeUnixAsLocaleDateTime = (time: TimeUnix | undefined, tz: TimeZone | undefined): DateTimeString | undefined => {
	if (!time) return;
	return getTimeUnixAsLocaleDate(time, tz) + ", " + getTimeUnixAsLocaleTime(time, tz);
};

export const getTimeUnixAsLocaleTime = (time: TimeUnix | undefined, tz: TimeZone | undefined): string | undefined => {
	if (!time) return;
	// const tc = useContext(TranslationContext);
	const language = "en-CA";
	const d = new Date(time);
	return d.toLocaleTimeString(language, {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		timeZone: tz ?? "Canada/Eastern",
		// timeZoneName: "short",
	});
};
