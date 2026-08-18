import { ListHelper } from "@/src/common/utility/list/ListHelper.js";
import { AuditChange, GetChange } from "@/src/modules/audit/type/AuditChange.js";
import { v7 } from "uuid";

/** @deprecated REMINDER: Do NOT use directly, always extend! */
export type Uuid = string;

export const newUuid = (): Uuid => v7({});

// TODO: reidenzon - Make this generic... but passing accessor and getChange methods gets ugly.
export const getUuidAuditChangeList = (from: Uuid[] | undefined, to: Uuid[] | undefined): AuditChange<Uuid>[] | undefined => {
	const ids = ListHelper.combine((id) => id, from, to);
	const changes: AuditChange<Uuid>[] = [];
	for (const id of ids) {
		const [from, to] = id.subjects;
		const change = GetChange.primitive(from, to);
		if (change) changes.push(change);
	}
	if (!changes.length) return;
	return changes;
};
