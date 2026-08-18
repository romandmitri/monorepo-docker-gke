import { Config } from "@/src/common/config/Config.js";
import { createGcpLoggingPinoConfig } from "@google-cloud/pino-logging-gcp-config";
import { FastifyLoggerOptions } from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger.js";
import { LevelWithSilentOrString } from "pino";

export enum LoggerFormat {
	JSON = "json",
	Pretty = "pretty",
}

type Logger = boolean | (FastifyLoggerOptions & PinoLoggerOptions);

export const loggerOptionsJson = () => {
	return createGcpLoggingPinoConfig(
		{},
		{
			level: Config.Logger_Level,
		},
	);
};

export const loggerOptionsPretty = (level?: LevelWithSilentOrString) => {
	return {
		level: level ?? Config.Logger_Level,
		transport: {
			// https://www.npmjs.com/package/pino-pretty
			target: "pino-pretty",
			options: {
				colorize: true,
				crlf: true,
				translateTime: "SYS:HH:MM:ss Z",
			},
			// TODO: reidenzon - Use messageFormat to add current time, etc...
			// messageFormat: (log, messageKey, levelLabel, ) => {}
		},
	};
};

export const loggerOptions = (): Logger => {
	const format = Config.Logger_Format;
	if (format == LoggerFormat.JSON) return loggerOptionsJson();
	if (format == LoggerFormat.Pretty) return loggerOptionsPretty(Config.Logger_Level);
	return true;
};
