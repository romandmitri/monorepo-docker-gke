import {SheetHeader, SheetHeaderName} from "@/src/common/adapters/google/sheets/type/SheetHeader.js";

export type SheetRowRaw = string[];

interface SheetRowConstructor {
	header: SheetHeader;
	raw: SheetRowRaw;
}

export class SheetRow {
	header: SheetHeader;
	raw: SheetRowRaw;

	constructor(p: SheetRowConstructor) {
		this.header = p.header;
		this.raw = p.raw;
	}

	getCellString = <T extends string>(column: SheetHeaderName): T | undefined => {
		const index = this.header.getColumnIndex(column);
		if (index == undefined) return;
		const value = (this.raw[index] ?? "").trim();
		if (value.length == 0) return;
		return value as T;
	}
}
