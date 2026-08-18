import { getPostmarkServer } from "@/src/common/adapters/postmark/postmark.js";
import { PostmarkMessageError } from "@/src/common/adapters/postmark/type/PostmarkMessageError.js";
import { PostmarkMessageId } from "@/src/common/adapters/postmark/type/PostmarkMessageId.js";
import { Email } from "@/src/common/utility/email/Email.js";
import { UrlString } from "@/src/common/utility/http/Url.js";
import { Context } from "@/src/entry/_/Context.js";

/**
 * REMINDER
 * Postmark does NOT fail (ie: bounce) instantly so no point in tracking errors here.
 * Only API errors occur, which are very rare.
 */

export type PostmarkMessageReferenceDatabase = {
	to: Email;
	id?: PostmarkMessageId;
	error?: PostmarkMessageError;
};

export type PostmarkMessageReferenceResponse = {
	to: Email;
	id?: PostmarkMessageId;
	error?: PostmarkMessageError;
	url?: UrlString;
};

// TODO: reidenzon - Don't be lazy, make proper class implementation.
export class PostmarkMessageReference {
	static toResponse = async (ctx: Context, ref: PostmarkMessageReferenceDatabase): Promise<PostmarkMessageReferenceResponse> => {
		const server = await getPostmarkServer(ctx);
		const serverId = server?.ID;
		const url = `https://account.postmarkapp.com/servers/${serverId}/streams/outbound/messages/${ref.id}`;
		return {
			to: ref.to,
			id: ref.id,
			error: ref.error,
			url: serverId ? url : undefined,
		};
	};

	static toResponseList = async (ctx: Context, fromList: PostmarkMessageReferenceDatabase[]): Promise<PostmarkMessageReferenceResponse[]> => {
		return await Promise.all(fromList.map(async (from) => await PostmarkMessageReference.toResponse(ctx, from)));
	};
}
