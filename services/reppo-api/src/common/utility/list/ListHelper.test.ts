import { ListHelper } from "@/src/common/utility/list/ListHelper.js";
import { TesterContext } from "@/src/entry/test/TesterContext.test.js";
import assert from "node:assert";

type Subject = { id: string; data: string };

const subjectList = (ids?: string): Subject[] | undefined => {
	if (!ids) return;
	return ids.split("").map((id) => ({
		id: id,
		data: `data-${id}`,
	}));
};

TesterContext.doTest(import.meta.url, "ListHelper.combine", async (ctx, fastify) => {
	const tests = [
		{ lists: [undefined], expect: "" },
		{ lists: [undefined, undefined], expect: "" },
		{ lists: [undefined, undefined, undefined], expect: "" },
		{ lists: ["a", undefined], expect: "a" },
		{ lists: [undefined, "a"], expect: "a" },
		{ lists: [undefined, undefined, "a"], expect: "a" },
		{ lists: ["a", "a"], expect: "a" },
		{ lists: ["ab", "ab"], expect: "ab" },
		{ lists: ["a", "b"], expect: "ab" },
		{ lists: ["b", "a"], expect: "ba" },
		{ lists: ["ac", "abcd"], expect: "acbd" },
		{ lists: ["ac", "abcd", undefined], expect: "acbd" },
		{ lists: ["ac", undefined, "abcd"], expect: "acbd" },
	];
	for (const idx in tests) {
		const ts = tests[idx];
		const lists = ts.lists.map((ids) => subjectList(ids));
		const result = ListHelper.combine((s) => s.id, ...lists);
		const resultIds = result.map((r) => r.keyValue).join("");
		assert.strictEqual(resultIds, ts.expect, `test [${idx}]`);
	}
});
