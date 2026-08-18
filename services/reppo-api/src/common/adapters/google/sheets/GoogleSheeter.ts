import { googleSheets } from "@/src/common/adapters/google/sheets/sheets.js";
import { SheetHeader } from "@/src/common/adapters/google/sheets/type/SheetHeader.js";
import { SheetRow } from "@/src/common/adapters/google/sheets/type/SheetRow.js";
import { GoogleSheetId } from "@/src/common/config/Config.js";
import { Context } from "@/src/entry/_/Context.js";

// ie: "local", "cluster-stage", etc...
type Tab = string;

export class GoogleSheeter {
	static getRows = async (ctx: Context, sheet: GoogleSheetId, tab: Tab): Promise<[SheetRow[], Error | undefined]> => {
		let header: SheetHeader | undefined;
		const rows: SheetRow[] = [];

		ctx.log.debug({ msg: "GoogleSheets.getRows.start", sheet, tab });
		const sheets = googleSheets();

		try {
			const response = await sheets.spreadsheets.values.get({
				spreadsheetId: sheet,
				range: tab,
			});
			response.data.values?.forEach((raw, index) => {
				// ctx.log.debug({msg: "GoogleSheets.getRows.row.RAW", index, raw});
				if (index == 0) {
					header = new SheetHeader({ raw: raw });
					ctx.log.debug({ msg: "GoogleSheets.getRows.row.HEADER", columns: header.getColumnNames() });
				} else {
					rows.push(
						new SheetRow({
							header: header!,
							raw: raw,
						}),
					);
				}
			});
		} catch (err) {
			// ctx.log.error({ msg: "GoogleSheets.getRows.error", err });
			return [rows, err as Error];
		}

		ctx.log.debug({ msg: "GoogleSheets.getRows.result", rows: rows.length });

		return [rows, undefined];
	};
}
