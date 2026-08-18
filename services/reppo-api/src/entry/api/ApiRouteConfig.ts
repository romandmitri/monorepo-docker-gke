import { ApiAuthorization } from "@/src/entry/api/ApiAuthorization.js";
import { RouteShorthandOptions } from "fastify";

declare module "fastify" {
	interface FastifyContextConfig {
		authorization?: ApiAuthorization;
		isSessionRefresh?: boolean;
		rawBody?: boolean;
	}
}

interface Props {
	// TODO: reidenzon - Consider making this an array.
	authorization: ApiAuthorization;

	/**
	 * We do NOT want to update session on all /api routes because some might be cached.
	 * It's ok to update session sparsely because session last a very long expiry time.
	 */
	isSessionRefresh?: boolean;

	/**
	 * https://www.npmjs.com/package/@fastify/websocket
	 */
	isSocket?: boolean;

	/**
	 * Enable raw body parsing for this route.
	 * Required for webhook signature verification (e.g. Stripe).
	 * https://www.npmjs.com/package/fastify-raw-body
	 */
	rawBody?: boolean;
}

export const apiRouteConfig = (p: Props): RouteShorthandOptions => {
	const opts: RouteShorthandOptions = {};
	opts.config = {};
	opts.config.authorization = p.authorization;
	opts.config.isSessionRefresh = p.isSessionRefresh;
	opts.config.rawBody = p.rawBody;
	// @ts-ignore // https://www.npmjs.com/package/@fastify/websocket
	if (p.isSocket) opts.websocket = true;
	return opts;
};
