// Tables managed by reppo-infrastructure/terraform/modules/_/bigquery/bigquery.tf file.

import {BigQuery_Audit_Insert} from "@/src/common/adapters/google/bigquery/type/BigQuery_Audit_Insert.js";

export enum BigQueryTable {
	Audits = "audits",
	// Groups = "groups",
	// Jobs = "jobs",
	// Sessions = "sessions",
	// Users = "users",
}

export interface BigQueryTableMap {
	[BigQueryTable.Audits]: BigQuery_Audit_Insert;
}
