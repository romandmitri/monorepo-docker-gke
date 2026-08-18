import { Context } from "@/src/entry/_/Context.js";

export class JsonHelper {
	static parse = <T extends any>(ctx: Context, from: string | undefined): T | undefined => {
		if (!from) return;
		try {
			return JSON.parse(from);
		} catch (err) {
			ctx.log.error({ msg: "JsonHelper.parse.ERROR", from, err });
		}
	};
}
