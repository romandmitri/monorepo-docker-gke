import { BigQueryTable } from "@/src/common/adapters/google/bigquery/type/BigQueryTable.js";
import { Config } from "@/src/common/config/Config.js";
import { BigQuery } from "@google-cloud/bigquery";

export const bigQuery = new BigQuery({
	keyFilename: Config.GoogleCredentialsFile,
});

export const bigQueryDataset = bigQuery.dataset(Config.Google_BigQuery_DatasetId);
export const bigQueryTable = (table: BigQueryTable) => bigQueryDataset.table(table);
