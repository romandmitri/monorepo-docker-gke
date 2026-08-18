import { Database } from "@/src/common/adapters/kysely/Database.js";
import { dbLog } from "@/src/common/adapters/kysely/db-log.js";
import { Config } from "@/src/common/config/Config.js";
import fastifyPlugin from "fastify-plugin";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import pino from "pino";

declare module "fastify" {
	interface FastifyInstance {
		db: Kysely<Database>;
	}
}

export const dbCreate = (logger?: pino.BaseLogger): Kysely<Database> => {
	return new Kysely<Database>({
		log: dbLog(logger),
		dialect: new PostgresDialect({
			pool: new Pool({ connectionString: Config.Database_Url }),
		}),
	});
};

export const dbPlugin = fastifyPlugin(async (fastify, options) => {
	const db = dbCreate(fastify.log);
	fastify.decorate("db", db);
	fastify.addHook("onClose", async () => {
		fastify.log.info({ msg: "dbPlugin.onClose" });
		await db.destroy();
	});
});
