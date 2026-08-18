import { asyncManager } from "@/src/common/utility/async/AsyncManager.js";
import fastifyPlugin from "fastify-plugin";

export const asyncManagerPlugin = fastifyPlugin(async (fastify, options) => {
	asyncManager.init({ log: fastify.log });
	fastify.addHook("onClose", async () => {
		fastify.log.info({ msg: "asyncManagerPlugin.onClose" });
		await asyncManager.close();
	});
});
