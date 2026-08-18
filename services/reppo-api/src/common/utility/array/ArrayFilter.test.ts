import { ArrayFilter } from "@/src/common/utility/array/ArrayFilter.js";
import { TesterContext } from "@/src/entry/test/TesterContext.test.js";
import assert from "node:assert";

TesterContext.doTest(import.meta.url, "ArrayFilter.isAny", async (ctx, fastify) => {
	const tests = [
		{ array: undefined, values: [], expect: true },
		{ array: undefined, values: ["a"], expect: true },
		{ array: [], values: [undefined], expect: true },
		{ array: [], values: ["a"], expect: true },
		{ array: [], values: ["a", "b"], expect: true },
		{ array: ["a"], values: ["a", "b"], expect: true },
		{ array: ["a"], values: ["b"], expect: false },
		{ array: ["a"], values: [], expect: false },
		{ array: ["a"], values: [undefined], expect: false },
	];
	for (const idx in tests) {
		const ts = tests[idx];
		const result = ArrayFilter.isAny(ts.array, ts.values);
		assert.strictEqual(result, ts.expect, `test [${idx}]`);
	}
});
