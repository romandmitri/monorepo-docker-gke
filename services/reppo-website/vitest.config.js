import react from "@vitejs/plugin-react";
import * as path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import {defineConfig} from "vitest/config";

// https://vitest.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
			// TODO: reidenzon - This instead?!
			// "@": path.resolve(__dirname, "./src/"),
		},
	},
	test: {
		// TODO: reidenzon - Compare to happy-dom (in reppo-dashboard) then choose one.
		environment: "jsdom",
		globals: true,
	},
});
