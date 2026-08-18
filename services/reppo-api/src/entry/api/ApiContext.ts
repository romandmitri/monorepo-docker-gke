import { HttpHeader } from "@/src/common/utility/http/HttpHeader.js";
import { HttpIp } from "@/src/common/utility/http/HttpIp.js";
import { HttpMethod } from "@/src/common/utility/http/HttpMethod.js";
import { HttpStatus } from "@/src/common/utility/http/HttpStatus.js";
import { LocationCountryIsoCode } from "@/src/common/utility/location/LocationCountryIsoCode.js";
import { Context, ContextConstructor } from "@/src/entry/_/Context.js";
import { ContextMode } from "@/src/entry/_/ContextMode.js";
import { ApiResponse, ApiResponseData, newApiResponse } from "@/src/entry/api/ApiResponse.js";
import { ApiResponseMessage, ApiResponseMessageContent, ApiResponseMessageDisplay, ApiResponseMessageStatus } from "@/src/entry/api/ApiResponseMessage.js";
import { AuditContext } from "@/src/modules/audit/type/AuditContext.js";
import { FastifyReply, FastifyRequest } from "fastify";

interface Constructor extends ContextConstructor {
	request: FastifyRequest;
	reply: FastifyReply;
}

export class ApiContext<Data extends ApiResponseData> extends Context {
	mode = ContextMode.Api;

	request: FastifyRequest;
	reply: FastifyReply;
	response: ApiResponse<Data>;

	constructor(p: Constructor) {
		super({ ...p, isAwait: p.isAwait ?? false });
		this.request = p.request;
		this.reply = p.reply;
		this.response = newApiResponse(p.request.id);
	}

	fail = (m: ApiResponseMessageContent, status: HttpStatus = HttpStatus.BadRequest) => {
		this.errorToast(m);
		this.log.warn({ msg: m, context: this.toAuditContext() });
		this.reply.status(status);
		this.reply.send(this.response);
	};

	toAuditContext(): AuditContext {
		const ctx = super.toAuditContext();
		ctx.userId = this.currentUserId;
		ctx.request = {
			host: this.request.host,
			method: this.request.method as HttpMethod,
			url: this.request.url,
			ip: this.getRequestIP(),
		};
		return ctx;
	}

	message = (m: ApiResponseMessage) => {
		this.response.messages.push(m);
	};

	errorConsole = (content: ApiResponseMessageContent) => {
		this.message({ content: content, display: ApiResponseMessageDisplay.Console, status: ApiResponseMessageStatus.Error });
	};

	errorToast = (content: ApiResponseMessageContent) => {
		this.message({ content: content, display: ApiResponseMessageDisplay.Toast, status: ApiResponseMessageStatus.Error });
	};

	success = (m: ApiResponseMessageContent) => {
		this.successConsole(m);
	};

	successConsole = (content: ApiResponseMessageContent) => {
		this.message({ content: content, display: ApiResponseMessageDisplay.Console, status: ApiResponseMessageStatus.Success });
	};

	successToast = (content: ApiResponseMessageContent) => {
		this.message({ content: content, display: ApiResponseMessageDisplay.Toast, status: ApiResponseMessageStatus.Success });
	};

	getRequestIP = (): HttpIp => {
		const headers = this.request.headers;
		// The x-forwarded-for value is a comma-separated string, ie:
		// "99.251.45.162, 172.70.50.135, 34.54.243.233" (source, cloudflare, kubernetes)
		const forward = headers[HttpHeader.XForwardedFor] as string | undefined;
		if (!forward) return this.request.ip;
		return forward.split(",")[0].trim();
	};

	/** Cloudflare `cf-ipcountry` header — 2-letter ISO country code (e.g. "US", "CA"). */
	getRequestCountry = (): LocationCountryIsoCode | undefined => {
		const country = this.request.headers[HttpHeader.CloudFlareIpCountry] as string | undefined;
		return country?.toUpperCase() as LocationCountryIsoCode | undefined;
	};
}
