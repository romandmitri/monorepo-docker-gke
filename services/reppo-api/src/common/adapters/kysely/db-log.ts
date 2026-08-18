import { StatementAnalyzer } from "@/src/common/adapters/kysely/StatementAnalyzer.js";
import { Config } from "@/src/common/config/Config.js";
import { Context } from "@/src/entry/_/Context.js";
import { Compilable, Explainable, LogEvent } from "kysely";
import pino from "pino";

/**
 * Helpers for db query logging and explain analysis.
 */

// TODO: reidenzon - Simplify this, use $call instead?! See db-log.ts
// https://kysely.dev/docs/recipes/logging
export const dbLog = (log?: pino.BaseLogger) => async (event: LogEvent) => {
	const statement = event.query.sql.replaceAll('"', "");
	if (!log) return;
	if (event.level == "error") {
		log.error({
			durationMS: event.queryDurationMillis,
			error: event.error,
			statement: statement,
			params: event.query.parameters,
		});
	}
	if (event.level == "query") {
		log.debug({
			durationMS: event.queryDurationMillis,
			statement: statement,
			params: event.query.parameters,
		});
	}
};

export const dbLogExecute = <T extends Compilable>(ctx: Context, qb: T): T => {
	// const compile = qb.compile();
	// TODO: reidenzon - Make it pretty.
	// console.log("dbLogExecute", compile.sql, compile.parameters);
	// ctx.log.debug({msg: "dbLogExecute", sql: compile.sql, parameters: compile.parameters});
	// console.log(compile);
	return qb;
};

export const dbLogSelect = <T extends Compilable & Explainable>(ctx: Context, qb: T): T => {
	// const compile = qb.compile();
	// console.log("dbLogSelect", compile.sql, compile.parameters);
	if (Config.Database_Analyze) {
		const analyzer = new StatementAnalyzer(ctx, qb);
		ctx.withPromise(analyzer.analyze());
	}
	return qb;
};
