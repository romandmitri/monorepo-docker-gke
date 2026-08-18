import { consoleCatch } from "@/src/common/utility/log/Log.ts";

export class JsonHelper {
	static parse = <T extends any>(from: string | undefined): T | undefined => {
		if (!from) return;
		try {
			return JSON.parse(from);
		} catch (err) {
			consoleCatch(err);
		}
	};
}
