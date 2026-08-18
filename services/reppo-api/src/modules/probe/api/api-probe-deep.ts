import {HttpStatus} from "@/src/common/utility/http/HttpStatus.js";
import {ApiAuthorization} from "@/src/entry/api/ApiAuthorization.js";
import {ApiRoute} from "@/src/entry/api/ApiRoute.js";
import {apiRouteConfig} from "@/src/entry/api/ApiRouteConfig.js";
import {FastifyInstance, FastifyPluginOptions, RouteGenericInterface} from "fastify";

interface ApiRequest extends RouteGenericInterface {
}

export const api_GET_probe_deep = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
	fastify.get<ApiRequest>(ApiRoute.GET_probe_deep(), apiRouteConfig({
		authorization: ApiAuthorization.Public,
	}), async (request, reply) => {
		request.log.info(`GET /api via [${request.url}]`);
		reply.status(HttpStatus.OK);
		return {
			url: request.url,
		};
	})
}
