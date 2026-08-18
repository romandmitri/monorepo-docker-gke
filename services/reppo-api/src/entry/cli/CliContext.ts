import { dbCreate } from "@/src/common/adapters/kysely/db.js";
import { loggerOptionsPretty } from "@/src/common/config/Logger.js";
import { Context } from "@/src/entry/_/Context.js";
import { ContextMode } from "@/src/entry/_/ContextMode.js";
import { CliOptions } from "@/src/entry/cli/cliMode.js";
import pino, { LevelWithSilentOrString } from "pino";

export class CliContext extends Context {
	mode = ContextMode.Cli;
	stdout = process.stdout;
	// TODO: reidenzon - Reference original CliCommand to help with toAuditContext() function.
	// command: CliCommand;

	constructor(p: {
		//
		level?: LevelWithSilentOrString;
	}) {
		const logger = pino(loggerOptionsPretty(p.level));
		super({
			db: dbCreate(logger),
			log: logger,
			isAwait: true,
		});

		this.log.info({ msg: "Start...", time: this.createdAt });
	}

	static doCommand = async (argv: CliOptions, callback: DoCommandCallback) => {
		const ctx = new CliContext({ level: argv.level });
		await ctx.withTransaction();
		await callback(ctx);
		await ctx.end();
	};

	end = async () => {
		this.log.info({ msg: "Ending..." });
		await Promise.all(this.promises);
		await this.trx_?.commit().execute();
		await this.db_.destroy();
		// TODO: reidenzon - Add elapsed time to ALL logs!
		this.log.info({ msg: "...done!", elapsed: this.getTimeElapsedPretty() });
	};

	fail = (msg: string) => {
		this.log.error({ msg: msg });
		throw new Error(msg);
	};

	write = (buffer: Uint8Array | string) => {
		this.stdout.write(buffer);
	};
}

type DoCommandCallback = (ctx: CliContext) => Promise<void>;
