import {SheetHeader} from "@/src/common/adapters/google/sheets/type/SheetHeader.js";
import {TesterContext} from "@/src/entry/test/TesterContext.test.js";
import assert from "node:assert";

TesterContext.doTest(import.meta.url, "SheetHeader.getColumnIndex", async (ctx, fastify) => {
	const rows = [
		["alpha", "bravo", "charlie"]
	];
	const header = new SheetHeader({raw: rows[0]})
	assert.strictEqual(header.getColumnIndex("alpha"), 0)
	assert.strictEqual(header.getColumnIndex("bravo"), 1)
	assert.strictEqual(header.getColumnIndex("charlie"), 2)
})
