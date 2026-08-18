import {SheetHeader} from "@/src/common/adapters/google/sheets/type/SheetHeader.js";
import {SheetRow, SheetRowRaw} from "@/src/common/adapters/google/sheets/type/SheetRow.js";
import {TesterContext} from "@/src/entry/test/TesterContext.test.js";
import assert from "node:assert";

TesterContext.doTest(import.meta.url, "SheetRow.getCellString", async (ctx, fastify) => {
	const rows: SheetRowRaw[] = [
		["alpha", "bravo", "charlie"],
		["1-alpha", "1-bravo", "1-charlie"],
		["2-alpha", "2-bravo", "2-charlie"],
	];
	const header = new SheetHeader({raw: rows[0]});
	const row1 = new SheetRow({header: header, raw: rows[1]});
	const row2 = new SheetRow({header: header, raw: rows[2]});

	assert.strictEqual(row1.getCellString("alpha"), "1-alpha")
	assert.strictEqual(row1.getCellString("bravo"), "1-bravo")
	assert.strictEqual(row1.getCellString("charlie"), "1-charlie")

	assert.strictEqual(row2.getCellString("alpha"), "2-alpha")
	assert.strictEqual(row2.getCellString("bravo"), "2-bravo")
	assert.strictEqual(row2.getCellString("charlie"), "2-charlie")
})
