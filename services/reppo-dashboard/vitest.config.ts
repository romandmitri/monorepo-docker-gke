import { defineConfig } from "vitest/config";
import * as path from "node:path";

// https://vitest.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
	test: {
		environment: "happy-dom",
		globals: true,
	},
});
