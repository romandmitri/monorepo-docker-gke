import {dbPlugin} from "@/src/common/adapters/kysely/db.js";
import {ngrokConnect} from "@/src/common/adapters/ngrok/ngrok.js";
import {posthogPlugin} from "@/src/common/adapters/posthog/posthogPlugin.js";
import {Config} from "@/src/common/config/Config.js";
import {LoggerFormat, loggerOptions} from "@/src/common/config/Logger.js";
import {asyncManagerPlugin} from "@/src/common/utility/async/asyncManagerPlugin.js";
import {TimeMillisecond} from "@/src/common/utility/time/TimeMillisecond.js";
import {apiContextPlugin} from "@/src/entry/api/ApiContextPlugin.js";
import {cronRunnerPlugin} from "@/src/modules/cron/logic/cronRunnerPlugin.js";
import {api_GET_probe_deep} from "@/src/modules/probe/api/api-probe-deep.js";
import {api_GET_probe_error} from "@/src/modules/probe/api/api-probe-error.js";
import {api_GET_probe_root} from "@/src/modules/probe/api/api-probe-root.js";
import {queueSubscriberPlugin} from "@/src/modules/queue/logic/queueSubscriberPlugin.js";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import websocket from "@fastify/websocket";
import fastifyApiReference from "@scalar/fastify-api-reference";
import Fastify, {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyRawBody from "fastify-raw-body";
import {serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import {Argv} from "yargs";

export const apiMode = async (yargs: Argv) => {
	const fastify = Fastify({
		exposeHeadRoutes: false,
		logger: loggerOptions(),
	});

	if (Config.DeveloperAccess) {
		await fastify.register(fastifySwagger);
		await fastify.register(fastifySwaggerUi, {
			routePrefix: "/api/swagger",
		});
		await fastify.register(fastifyApiReference, {
			routePrefix: "/api/reference",
		});
	}

	if (Config.Logger_Format == LoggerFormat.Pretty) {
		const fastifyPrintRoutes = await import("fastify-print-routes");
		fastify.register(fastifyPrintRoutes.plugin, {compact: true});
	}

	fastifyRegister(fastify);

	fastify.register(sigterm);
	fastify.listen({port: 80, host: "0.0.0.0"}, (err, address) => {
		fastify.log.info({config: Config});
	});

	await ngrokConnect(fastify.log);
};

export const fastifyRegister = (fastify: FastifyInstance, isTest?: boolean) => {
	// TODO: reidenzon - Implement/adjust/fix global error handler.
	// https://fastify.dev/docs/latest/Reference/Errors/
	// https://fastify.dev/docs/latest/Reference/Server/#seterrorhandler
	// Errors.
	// REMINDER:
	// If you enable this, it WILL override default fastify catch/error behaviour.
	// Leaving this blank will give NO visibility.
	fastify.setErrorHandler((error, request, reply) => {
		fastify.log.error({
			msg: "fastifyRegister.setErrorHandler",
			error: {
				message: error.message,
				cause: error.cause,
				stack: error.stack,
			},
			request: {
				body: request.body,
				headers: request.headers,
				params: request.params,
				query: request.query,
				url: request.url,
			},
		});
		reply.status(500).send({error: "Internal Server Error", message: error.message});
	});

	// Zod.
	fastify.setValidatorCompiler(validatorCompiler);
	fastify.setSerializerCompiler(serializerCompiler);

	// CORS.
	fastify.register(fastifyCors, {
		methods: "*",
		origin: "*",
	});

	// WebSocket.
	fastify.register(websocket);

	fastify.register(fastifyRawBody, {
		field: "rawBody",
		global: false, // Don't add to all routes, only where config.rawBody is true
		encoding: "utf8",
		runFirst: true,
	});

	// Plugins.
	fastify.register(dbPlugin);
	fastify.register(apiContextPlugin);
	fastify.register(asyncManagerPlugin);
	fastify.register(posthogPlugin);

	if (!isTest) {
		fastify.register(queueSubscriberPlugin);
		fastify.register(cronRunnerPlugin);
	}

	// Probe.
	fastify.register(api_GET_probe_root);
	fastify.register(api_GET_probe_deep);
	fastify.register(api_GET_probe_error);

	// The following are EXAMPLES...

	// Auth.
	// fastify.register(api_GET_auth_callback);
	// fastify.register(api_GET_auth_login);
	// fastify.register(api_GET_auth_login_fast);
	// fastify.register(api_GET_auth_logout);

	// User.
	// fastify.register(api_GET_user_current);
	// fastify.register(api_PATCH_user);
};

export const sigterm = fastifyPlugin(async (fastify, options) => {
	// TODO: reidenzon - Alternative, listen to signal via plugin...
	// https://github.com/dnlup/fastify-traps

	// https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-terminating-with-grace
	// https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination
	// https://github.com/fastify/fastify/discussions/5140

	process.on("SIGTERM", async (signal) => {
		fastify.log.info({msg: "apiMode.SIGTERM.received", signal});

		/**
		 * REMINDER
		 * The [terminationGracePeriodSeconds] value is set to 300s (5m) for the Kubernetes pod.
		 * Settings this duration to slightly lower such that we can timeout prematurely and
		 * log and error. Most jobs run less than 2m so ~5m timeout should cover that.
		 */

		const duration = 280 * TimeMillisecond.Second;

		const timeout = setTimeout(() => {
			fastify.log.error({msg: "apiMode.SIGTERM.force"});
			process.exit(1); // forced
		}, duration);

		timeout.unref();

		await fastify.close();
		clearTimeout(timeout);
		fastify.log.info({msg: "apiMode.SIGTERM.closed"});
		process.exit(0); // graceful
	});
});
