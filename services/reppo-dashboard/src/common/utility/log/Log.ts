// TODO: reidenzon - Find logger package?!

import { Config } from "@/src/common/config/Config.ts";

export const consoleCatch = (err: any) => {
	console.error(err);
	if (err instanceof Error) {
		// toast.error(JSON.stringify(err, null, 2));
	}
};

export const consoleLog = (...args: any) => {
	if (Config.DebugIsLog) {
		console.log(...args);
	}
};
