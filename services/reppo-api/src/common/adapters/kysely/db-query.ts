import {sql} from "kysely";

// https://kysely.dev/docs/recipes/extending-kysely#expression
export const dbJson = <T>(value: T): T => {
	return sql`CAST
        (${JSON.stringify(value)} AS JSONB)` as T
}
