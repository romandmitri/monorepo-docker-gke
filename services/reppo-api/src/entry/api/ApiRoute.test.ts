import {ApiRoute} from "@/src/entry/api/ApiRoute.js";
import {TesterContext} from "@/src/entry/test/TesterContext.test.js";
import assert from "node:assert";

TesterContext.doTest(import.meta.url, "getApiRoute", async (ctx, fastify) => {

	assert.strictEqual(ApiRoute.DELETE_group("alpha"), "/api/group/alpha");
	assert.strictEqual(ApiRoute.DELETE_group_user("alpha", "bravo"), "/api/group/alpha/user/bravo");
	assert.strictEqual(ApiRoute.GET_group_current("alpha"), "/api/group/alpha/current");
})
