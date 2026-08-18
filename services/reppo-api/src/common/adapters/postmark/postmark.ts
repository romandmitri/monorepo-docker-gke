import {PostmarkServer} from "@/src/common/adapters/postmark/type/PostmarkServer.js";
import {PostmarkServerToken} from "@/src/common/adapters/postmark/type/PostmarkServerToken.js";
import {Config} from "@/src/common/config/Config.js";
import {Context} from "@/src/entry/_/Context.js";
import postmark, {Attachment} from "postmark";

// https://postmarkapp.com/developer
// https://postmarkapp.com/developer/api/overview
// https://github.com/ActiveCampaign/postmark.js/wiki/Email-sending

export const DEFAULT_FROM_EMAIL = "REPPO <info@reppo.ca>";

let server: PostmarkServer | undefined;

const isPostmark = (): boolean => {
	if (!Config.Postmark_ServerToken) return false;
	return true;
};

export const getPostmarkServerToken = (ctx: Context): PostmarkServerToken | undefined => {
	if (!isPostmark()) {
		ctx.log.error({msg: "getPostmarkServerToken.FAIL"});
		return;
	}
	return Config.Postmark_ServerToken;
};

export const getPostmarkClient = (ctx: Context): postmark.ServerClient | undefined => {
	const serverToken = getPostmarkServerToken(ctx);
	if (!serverToken) return;
	return new postmark.ServerClient(serverToken);
};

export const getPostmarkServer = async (ctx: Context): Promise<PostmarkServer | undefined> => {
	if (server) return server;
	const client = getPostmarkClient(ctx);
	if (!client) return;
	server = await client.getServer();
	return server;
};

// TODO: reidenzon - Why does this exist if identical to postmark.Message type?
export interface PostmarkEmailRequest {
	From: string;
	To: string;
	Cc?: string;
	Bcc?: string;
	Subject: string;
	HtmlBody?: string;
	TextBody?: string;
	ReplyTo?: string;
	Attachments?: Attachment[];
}

export interface PostmarkEmailResponse {
	To: string | undefined;
	SubmittedAt: string;
	MessageID: string;
	ErrorCode: number;
	Message: string;
}

/** @deprecated TODO: reidenzon - Use {@link PostmarkSender} instead. */
export const sendPostmarkEmail = async (ctx: Context, request: PostmarkEmailRequest): Promise<[PostmarkEmailResponse | undefined, Error | undefined]> => {
	const client = getPostmarkClient(ctx);
	if (!client) {
		return [undefined, new Error("Postmark server token not configured")];
	}

	try {
		const postmarkRequest: postmark.Message = {
			...request,
		};

		const response = await client.sendEmail(postmarkRequest);
		ctx.log.debug({msg: "sendPostmarkEmail", response});

		const result: PostmarkEmailResponse = {
			To: response.To,
			SubmittedAt: response.SubmittedAt,
			MessageID: response.MessageID,
			ErrorCode: response.ErrorCode,
			Message: response.Message,
		};

		return [result, undefined];
	} catch (err) {
		ctx.log.error({msg: "sendPostmarkEmail.ERROR", err});
		return [undefined, err as Error];
	}
};
