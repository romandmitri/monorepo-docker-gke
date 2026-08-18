// Tables managed by reppo-infrastructure/terraform/modules/_/bigquery/bigquery.tf file.
import {TimeString} from "@/src/common/utility/time/TimeString.js";
import {AuditContextBigQuery} from "@/src/modules/audit/type/AuditContext.js";
import {AuditDetailsBigQuery} from "@/src/modules/audit/type/AuditDetails.js";
import {AuditId} from "@/src/modules/audit/type/AuditId.js";
import {AuditType} from "@/src/modules/audit/type/AuditType.js";

/**
 * REMINDER:
 * Terraform [google_bigquery_table] module is NOT stable!
 * Copy/paste schema from here instead...
 */

// prettier-ignore
const schema = `
[
	{ "name": "created_at", "mode": "REQUIRED", "type": "TIMESTAMP" },
	{ "name": "id", "mode": "REQUIRED", "type": "STRING" },
	{ "name": "context", "mode": "REQUIRED", "type": "JSON" },
	{ "name": "details", "mode": "REQUIRED", "type": "JSON" },
	{ "name": "type", "mode": "REQUIRED", "type": "STRING" }
]
`
export type BigQuery_Audit_Insert = {
	created_at: Date;
	id: AuditId;
	type: AuditType;
	context: AuditContextBigQuery;
	details: AuditDetailsBigQuery;
};

export type BigQuery_Audit_Select = {
	created_at: { value: TimeString };
	id: string;
	type: AuditType;
	context: AuditContextBigQuery;
	details: AuditDetailsBigQuery;
};
