import {Config} from "@/src/common/config/Config.js";
import {expect, test} from "vitest";

test("Config.test...", async () => {
	expect(Config.Title).toBe("Reppo");
	expect(Config.Title).not.toBe("Dashboard");
});
