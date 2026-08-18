import { bigQueryTable } from "@/src/common/adapters/google/bigquery/bigquery.js";
import { BigQueryTable, BigQueryTableMap } from "@/src/common/adapters/google/bigquery/type/BigQueryTable.js";
import { Context } from "@/src/entry/_/Context.js";

export class GoogleBigQuery {
	static put = async <Table extends BigQueryTable>(ctx: Context, table: Table, row: BigQueryTableMap[Table]) => {
		ctx.log.debug({ msg: "GoogleBigQuery.putRow", table });
		await bigQueryTable(table).insert(row);
	};
}
