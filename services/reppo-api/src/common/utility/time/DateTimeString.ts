// Time, formatted in relevant timezone.
import { getTimeUnixAsLocaleDateTime } from "@/src/common/utility/time/TimeUnix.js";
import { TimeZone } from "@/src/common/utility/time/TimeZone.js";

// Any local-based output, ie: Nov 10, 1985
export type DateTimeString = string;

export const getDateTimeStringFromDate = (d: Date, tz: TimeZone | undefined): DateTimeString => {
	return getTimeUnixAsLocaleDateTime(d.getTime(), tz)!;
};
