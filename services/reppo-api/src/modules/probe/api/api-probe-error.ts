import {ApiRoute} from "@/src/entry/api/ApiRoute.js";
import {FastifyInstance, FastifyPluginOptions, RouteGenericInterface} from "fastify";

interface ApiRequest extends RouteGenericInterface {
}

export const api_GET_probe_error = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
	fastify.get<ApiRequest>(ApiRoute.GET_probe_error(), async (request, reply) => {
		request.log.info(`GET /api/error via [${request.url}]`);
		request.log.error('This is an ERROR');
		return {
			yes: "You found the ERROR route!"
		};
	})
}
