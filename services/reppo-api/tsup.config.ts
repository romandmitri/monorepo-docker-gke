import {defineConfig} from "tsup";

export default defineConfig({
	clean: true,
	entry: ["/src/src/index.ts"],
	// TODO: reidenzon - Do we need cjs too?! Gemini says yes, but I doubt it.
	format: ["esm", "cjs"],
	platform: "node",
	target: "node24",
})
