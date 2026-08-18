import { timeDelay, TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.js";
import { Context } from "@/src/entry/_/Context.js";
import { Compilable, Explainable, sql } from "kysely";

type ExplainResults = ExplainResultRow[];
type ExplainResultRow = Record<"QUERY PLAN", ExplainResultRowLine>;
type ExplainResultRowLine = string;

export class StatementAnalyzer {
	ctx: Context;
	qb: Compilable & Explainable;

	constructor(ctx: Context, qb: Compilable & Explainable) {
		this.ctx = ctx;
		this.qb = qb;
	}

	analyze = async (): Promise<void> => {
		const ctx = this.ctx;
		const qb = this.qb;

		const results = await this.explain();
		const lines = this.getRowLines(ctx, results as ExplainResults);

		ctx.log.debug({ msg: "StatementAnalyzer.analyze", lines });

		const isScan = lines.some(this.isScan);
		if (!isScan) return;

		const compile = qb.compile();
		const statement = compile.sql.replaceAll('"', "");

		// Wait, so index errors appear at the bottom of the logs... easier to spot that way!
		await timeDelay(TimeMillisecond.Second);

		ctx.log.error({ msg: "StatementAnalyzer.analyze.isScan", statement, lines });
	};

	protected explain = async (): Promise<ExplainResults> => {
		const ctx = this.ctx;
		const qb = this.qb;
		try {
			return await qb.explain("text", sql`analyze`);
		} catch (err) {
			ctx.log.error({ msg: "StatementAnalyzer.explain.CATCH", err });
		}
		return [];
	};

	protected isScan = (line: ExplainResultRowLine): boolean => {
		return line.includes("Seq Scan");
	};

	protected getRowLines = (ctx: Context, results: ExplainResults): ExplainResultRowLine[] => {
		const lines: ExplainResultRowLine[] = [];
		for (const row of results) {
			for (const [key, value] of Object.entries(row)) {
				if (key !== "QUERY PLAN") {
					ctx.log.warn({ msg: "StatementAnalyzer.getRowLines.key.UNKNOWN", key });
					continue;
				}
				lines.push(value);
			}
		}
		return lines;
	};
}
