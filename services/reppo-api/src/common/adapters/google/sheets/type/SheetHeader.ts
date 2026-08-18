import {SheetRowRaw} from "@/src/common/adapters/google/sheets/type/SheetRow.js";

export type SheetHeaderName = string;

/**
 * This class maps the header row of a spreadsheet
 * from name to column index.
 */

interface SheetHeaderConstructor {
	raw: SheetRowRaw;
}

export class SheetHeader {
	private map: Map<SheetHeaderName, number> = new Map();

	constructor(p: SheetHeaderConstructor) {
		p.raw.forEach((col, index) => this.map.set(col, index));
	}

	getColumnNames = (): SheetHeaderName[] => {
		return [...this.map.keys()];
	}

	getColumnIndex = (column: SheetHeaderName): number | undefined => {
		return this.map.get(column);
	};
}
