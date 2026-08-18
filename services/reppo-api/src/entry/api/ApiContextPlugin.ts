import { verifyFirecrawlWebhook } from "@/src/common/adapters/firecrawl/firecrawl.js";
import { Config } from "@/src/common/config/Config.js";
import { verifyStripeWebhook } from "@/src/common/adapters/stripe/stripe.js";
import { HttpHeader } from "@/src/common/utility/http/HttpHeader.js";
import { HttpStatus } from "@/src/common/utility/http/HttpStatus.js";
import { ApiAuthorization } from "@/src/entry/api/ApiAuthorization.js";
import { ApiContext } from "@/src/entry/api/ApiContext.js";
import { apiResponseSessionFromToken } from "@/src/entry/api/ApiResponseSession.js";
import { UserJwtString, userJwtVerify } from "@/src/modules/user/type/UserJwt.js";
import fastifyPlugin from "fastify-plugin";
import Retell from "retell-sdk";

declare module "fastify" {
	interface FastifyRequest {
		ctx: ApiContext<any>;
	}
}

export const apiContextPlugin = fastifyPlugin(async (fastify, options) => {
	fastify.decorateRequest("ctx");
	fastify.addHook("onRequest", async (request, reply) => {
		request.log.debug({ msg: "apiContextPlugin.onRequest" });
		request.ctx = new ApiContext({
			db: fastify.db,
			log: request.log,
			reply: reply,
			request: request,
		});
		// TODO: reidenzon - IF created by TesterContext then pass the TRANSACTION here!
	});
	fastify.addHook("preHandler", async (request, reply) => {
		const ctx = request.ctx;

		// TODO: reidenzon - Move somewhere else?!
		const config = request.routeOptions.config;
		const authorization = config.authorization;
		const isSessionRefresh = config.isSessionRefresh;

		request.log.debug({ msg: "apiContextPlugin.preHandler.start", authorization, headers: request.headers });

		if (authorization == ApiAuthorization.Developer) {
			if (!Config.DeveloperAccess) {
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}
		}
		if (authorization == ApiAuthorization.Public) {
			const headerAuthorization = request.headers[HttpHeader.Authorization] ?? "";
			const token = headerAuthorization.split("Token ")[1];
			const tokenStruct = userJwtVerify(token);
			if (!tokenStruct) return;
			ctx.setCurrentUserId(tokenStruct.userId);
			// TODO: reidenzon - Refresh session on public routes too?! Meh...
		}
		if (authorization == ApiAuthorization.JwtHeader) {
			const headerAuthorization = request.headers[HttpHeader.Authorization] ?? "";
			const token = headerAuthorization.split("Token ")[1];
			const tokenStruct = userJwtVerify(token);
			if (!tokenStruct) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.JwtHeader.INVALID" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}

			// TODO: reidenzon - Optimize!
			//  Problem:
			//  Want to know that ctx.getCurrentUser() will always return valid user.
			//  Solution:
			//  Need to check if userId exists without making database call for full User object.
			//  Track last X userIds in global memory (and eventually Redis) to simply confirm.
			//  This only becomes an issue on local development.

			// TODO: reidenzon - Set session object instead?!
			ctx.setCurrentUserId(tokenStruct.userId);

			if (isSessionRefresh) {
				request.log.debug({ msg: "apiContextPlugin.preHandler.refresh", userId: tokenStruct.userId });
				ctx.success("Token refresh, on the house!");
				ctx.response.session = apiResponseSessionFromToken(tokenStruct);
			}
		}
		if (authorization == ApiAuthorization.JwtQuery) {
			const query = request.query as { token?: UserJwtString };
			const token = query.token;
			const tokenStruct = userJwtVerify(token);
			if (!tokenStruct) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.JwtQuery.INVALID" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}
			ctx.setCurrentUserId(tokenStruct.userId);
		}
		if (authorization == ApiAuthorization.FirecrawlWebhook) {
			const signature = request.headers[HttpHeader.FirecrawlSignature] as string;

			if (!signature) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.FirecrawlWebhook.noSignature" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}

			const rawBody = request.rawBody;

			if (!rawBody) {
				request.log.error({ msg: "apiContextPlugin.preHandler.FirecrawlWebhook.noRawBody" });
				reply.status(HttpStatus.InternalServerError).send();
				return;
			}

			const isValid = verifyFirecrawlWebhook(rawBody, signature, Config.Firecrawl_WebhookSecret);

			if (!isValid) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.FirecrawlWebhook.INVALID" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}

			request.log.debug({ msg: "apiContextPlugin.preHandler.FirecrawlWebhook.verified" });
		}
		if (authorization == ApiAuthorization.GoHighLevelWebhook) {
			const apiKey = request.headers[HttpHeader.GoHighLevelApiKey] as string;
			const isValid = apiKey == Config.GoHighLevel_ApiKey;
			if (!isValid) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.GoHighLevelWebhook.INVALID" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}
		}
		if (authorization == ApiAuthorization.RetellWebhook) {
			// https://docs.retellai.com/features/secure-webhook
			const signature = request.headers[HttpHeader.RetellSignature] as string;
			const isValid = Retell.verify(JSON.stringify(request.body), Config.Retell_Webhook_ApiKey, signature);
			if (!isValid) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.RetellWebhook.INVALID" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}
		}
		if (authorization == ApiAuthorization.StripeWebhook) {
			// https://docs.stripe.com/webhooks/signatures
			const signature = request.headers[HttpHeader.StripeSignature] as string;

			if (!signature) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.StripeWebhook.noSignature" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}

			const rawBody = request.rawBody;

			if (!rawBody) {
				request.log.error({ msg: "apiContextPlugin.preHandler.StripeWebhook.noRawBody" });
				reply.status(HttpStatus.InternalServerError).send();
				return;
			}

			const event = verifyStripeWebhook(ctx, rawBody, signature, Config.Stripe_WebhookSecret);

			if (!event) {
				request.log.warn({ msg: "apiContextPlugin.preHandler.StripeWebhook.INVALID" });
				reply.status(HttpStatus.Unauthorized).send();
				return;
			}

			request.log.debug({ msg: "apiContextPlugin.preHandler.StripeWebhook.verified", eventType: event.type });
		}
	});
});
