import {ApiRoute} from "@/src/entry/api/ApiRoute.js";
import {FastifyInstance, FastifyPluginOptions, RouteGenericInterface} from "fastify";

interface ApiRequest extends RouteGenericInterface {
}

export const api_GET_probe_root = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
	fastify.get<ApiRequest>(ApiRoute.GET_probe_root(), async (request, reply) => {
		request.log.info(`GET / via [${request.url}]`);
		return {url: request.url};
	})
}
