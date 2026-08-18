// Time in "HH:MM" format.
import { TimeMinute } from "@/src/common/utility/time/TimeMinute.js";

export type HourMinuteString = string;

export const getHourMinuteStringAsMinutes = (from: HourMinuteString): TimeMinute => {
	const [hour, minute] = from.split(":").map((value) => Number(value));
	return hour * TimeMinute.Hour + minute;
};
