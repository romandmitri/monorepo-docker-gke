import { fastifyRegister } from "@/src/entry/api/apiMode.js";
import { TesterContext } from "@/src/entry/test/TesterContext.test.js";
import Fastify, { FastifyInstance } from "fastify";
import { TestContext } from "node:test";

// https://fastify.dev/docs/latest/Guides/Testing/
export const fastifyTester = async (t: TestContext): Promise<[TesterContext, FastifyInstance]> => {
	const ctx = await TesterContext.new(t);
	const fastify = Fastify();
	fastifyRegister(fastify, true);
	fastify.addHook("onRequest", async (request, reply) => {
		// This is VERY important. Make sure Fastify uses same PostgreSQL TRANSACTION as TesterContext.
		// This way all data is rolled back on a per-test basis!
		await request.ctx.withTransaction(ctx);
	});
	t.after(async () => {
		await fastify.close();
	});
	await fastify.ready();
	return [ctx, fastify];
};
