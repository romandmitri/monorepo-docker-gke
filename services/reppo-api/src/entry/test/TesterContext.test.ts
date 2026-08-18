import { dbCreate } from "@/src/common/adapters/kysely/db.js";
import { Config } from "@/src/common/config/Config.js";
import { HttpHeader } from "@/src/common/utility/http/HttpHeader.js";
import { Context } from "@/src/entry/_/Context.js";
import { ContextMode } from "@/src/entry/_/ContextMode.js";
import { fastifyTester } from "@/src/entry/api/apiMode.test.js";
import { GroupTestHelper } from "@/src/modules/group/logic/GroupTestHelper.test.js";
import { UserTestHelper } from "@/src/modules/user/logic/UserTestHelper.test.js";
import { User } from "@/src/modules/user/type/User.js";
import { userJwtNew } from "@/src/modules/user/type/UserJwt.js";
import { FastifyInstance } from "fastify";
import http from "node:http";
import { test, TestContext } from "node:test";
import pino from "pino";

export class TesterContext extends Context {
	mode = ContextMode.Test;

	group: GroupTestHelper;
	user: UserTestHelper;

	constructor(p: {}) {
		super({
			db: dbCreate(),
			log: pino({ level: "warn" }),
			// log: pino(loggerOptionsPretty()),
			isAwait: true,
		});
		this.group = new GroupTestHelper(this, {});
		this.user = new UserTestHelper(this, {});
	}

	static new = async (t: TestContext): Promise<TesterContext> => {
		const ctx = new TesterContext({});
		await ctx.withTransaction();
		t.after(async () => {
			await ctx.trx_!.rollback().execute();
			await ctx.db_.destroy();
		});
		return ctx;
	};

	static doTest = async (path: string, name: string, callback: DoTestCallback) => {
		const prefix = `[${path.replace("file://" + Config.PathRoot + "/src/", "")}] ${name}`;
		await test(prefix, async (t: TestContext) => {
			const [ctx, fastify] = await fastifyTester(t);
			await callback(ctx, fastify);
		});
	};

	getHeaders = async (user: User): Promise<http.IncomingHttpHeaders> => {
		// const u = await UserTabler.select(this, {importId: importId});
		const token = userJwtNew({ userId: user.id });
		return {
			[HttpHeader.Authorization]: `Token ${token}`,
		};
	};
}

interface DoTestCallback {
	(ctx: TesterContext, fastify: FastifyInstance): Promise<void>;
}
