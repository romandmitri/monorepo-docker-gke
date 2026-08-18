import {TimeZone} from "@/src/common/utility/time/TimeZone.js";
import {Context} from "@/src/entry/_/Context.js";
import {Prompt} from "@/src/modules/prompt/type/Prompt.js";
import {formatInTimeZone} from "date-fns-tz";

/**
 * Use this to pass time into LLM model in a way the model can easily understand.
 */
export type TimePrompt = Prompt;

export const getTimePrompt = (ctx: Context, d: Date | undefined, tz: TimeZone | undefined): TimePrompt | undefined => {
	if (!d) return;
	const timezone = tz ?? "UTC";
	const pattern = `EEEE, MMMM d, yyyy 'at' h:mm a zzz ('${timezone}')`;
	try {
		return formatInTimeZone(d, timezone, pattern);
	} catch (err) {
		ctx.log.error({ msg: "getTimePrompt.ERROR", timezone, pattern, err });
		return formatInTimeZone(d, "UTC", pattern);
	}
};
