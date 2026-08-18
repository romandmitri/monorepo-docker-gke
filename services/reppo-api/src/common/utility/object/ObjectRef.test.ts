import { ObjectRef } from "@/src/common/utility/object/ObjectRef.js";
import { TesterContext } from "@/src/entry/test/TesterContext.test.js";
import assert from "node:assert";

class Class {
	value: string = "";
	constructor(p: { value: string }) {
		this.value = p.value;
	}
	clone = (): Class => {
		return new Class({ value: this.value });
	};
}

const logRef = (obRef: ObjectRef<any>, label: string) => {
	// REMINDER: Uncomment for debug.
	return;
	console.dir(
		{
			label: label,
			obRef: obRef,
			isWritten: obRef.isWritten,
			first: obRef.first,
			prev: obRef.prev,
			last: obRef.last,
		},
		{ depth: 8 },
	);
};

TesterContext.doTest(import.meta.url, "", async (ctx, fastify) => {
	const ob = new Class({ value: "alpha" });
	const obRef = ObjectRef.from(ob);

	logRef(obRef, "1A");
	assert.strictEqual(obRef.isWritten, true, "1A-written");
	assert.strictEqual(obRef.first.value, "alpha", "1A-first");
	assert.strictEqual(obRef.prev?.value, undefined, "1A-prev");
	assert.strictEqual(obRef.last.value, "alpha", "1A-last");

	obRef.written();
	logRef(obRef, "1B");
	assert.strictEqual(obRef.isWritten, true, "1B-written");
	assert.strictEqual(obRef.first.value, "alpha", "1B-first");
	assert.strictEqual(obRef.prev?.value, undefined, "1B-prev");
	assert.strictEqual(obRef.last.value, "alpha", "1B-last");

	obRef.stage.value = "bravo";
	logRef(obRef, "2A");
	assert.strictEqual(obRef.isWritten, false, "2A-written");
	assert.strictEqual(obRef.first.value, "alpha", "2A-first");
	assert.strictEqual(obRef.prev!.value, "alpha", "2A-prev");
	assert.strictEqual(obRef.last.value, "bravo", "2A-last");

	obRef.written();
	logRef(obRef, "2B");
	assert.strictEqual(obRef.first.value, "alpha", "2B-01");
	assert.strictEqual(obRef.prev!.value, "alpha", "2B-02");
	assert.strictEqual(obRef.last.value, "bravo", "2B-03");

	obRef.stage.value = "charlie";
	logRef(obRef, "3A");
	assert.strictEqual(obRef.first.value, "alpha", "3A-01");
	assert.strictEqual(obRef.prev!.value, "bravo", "3A-02");
	assert.strictEqual(obRef.last.value, "charlie", "3A-03");

	obRef.written();
	logRef(obRef, "3B");
	assert.strictEqual(obRef.first.value, "alpha", "3B-01");
	assert.strictEqual(obRef.prev!.value, "bravo", "3B-02");
	assert.strictEqual(obRef.last.value, "charlie", "3B-03");
});
