/**
 * This is a sugar helper to keep TypeScript easy to read for common
 * return type of Promise<[Type|undefined, Error|undefined]> format.
 */
import { Context } from "@/src/entry/_/Context.js";

export type Return<T, E extends Error = Error> = Promise<ReturnValue<T, E>>;

export type ReturnValue<T, E extends Error> = [T, undefined] | [undefined, E]; // [T | undefined, E | undefined];

export const getError = <T>(ctx: Context, err: Error | string | undefined): ReturnValue<T, Error> => {
	if (err instanceof Error) {
		ctx.log.error({ msg: err.message ?? "getError", err });
		return [undefined, err];
	}
	if (typeof err === "string") {
		ctx.log.error({ msg: err });
		return [undefined, new Error(err)];
	}
	ctx.log.error({ msg: "getError", err });
	return [undefined, new Error("getError")];
};

export const getReturn = <T>(value: T | undefined): ReturnValue<T, any> => [value as T, undefined];
