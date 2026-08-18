import { TimeString } from "@/src/common/utility/time/TimeString.ts";
import { format } from "date-fns";

// Date in YYYY-MM-DD format.
export type DateString = string;
export const DateStringFormat = "yyyy-MM-dd";

export const getDateStringFromTimeString = (from: TimeString | undefined): DateString | undefined => {
	if (!from) return;
	const d = new Date(from);
	return format(d, DateStringFormat);
};
