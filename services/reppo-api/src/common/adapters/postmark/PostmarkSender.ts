import { DEFAULT_FROM_EMAIL, getPostmarkClient } from "@/src/common/adapters/postmark/postmark.js";
import { getPostmarkMessageError } from "@/src/common/adapters/postmark/type/PostmarkMessageError.js";
import { PostmarkMessageReferenceDatabase } from "@/src/common/adapters/postmark/type/PostmarkMessageReference.js";
import { Email } from "@/src/common/utility/email/Email.js";
import { Context } from "@/src/entry/_/Context.js";
import { Attachment } from "postmark";

export abstract class PostmarkSender {
	static sendList = async (
		ctx: Context,
		p: {
			to: Email[];
			subject: string;
			htmlBody: string;
			attachments?: Attachment[];
		},
	): Promise<[PostmarkMessageReferenceDatabase[], Error | undefined]> => {
		ctx.log.debug({ msg: "PostmarkSender.sendList", p });
		const references = await Promise.all(
			p.to.map(async (to) => {
				const [reference, err] = await PostmarkSender.send(ctx, {
					to: to,
					subject: p.subject,
					htmlBody: p.htmlBody,
					attachments: p.attachments,
				});
				return reference;
			}),
		);
		// TODO: reidenzon - Combine multiple errors into single large error?!
		return [references, undefined];
	};

	static send = async (
		ctx: Context,
		p: {
			to: Email;
			subject: string;
			htmlBody: string;
			attachments?: Attachment[];
		},
	): Promise<[PostmarkMessageReferenceDatabase, Error | undefined]> => {
		ctx.log.debug({ msg: "PostmarkSender.send", p });

		const reference: PostmarkMessageReferenceDatabase = {
			to: p.to,
		};

		const postmarkClient = getPostmarkClient(ctx);
		if (!postmarkClient) {
			const err = new Error("PostmarkSender.send.CLIENT");
			reference.error = getPostmarkMessageError(err);
			return [reference, err];
		}

		try {
			ctx.log.debug({ msg: "PostmarkSender.send.email", p });
			const response = await postmarkClient.sendEmail({
				From: DEFAULT_FROM_EMAIL,
				To: p.to,
				Subject: p.subject,
				HtmlBody: p.htmlBody,
				Attachments: p.attachments,
			});
			ctx.log.debug({ msg: "PostmarkSender.send.response", response });
			reference.id = response.MessageID;
			return [reference, undefined];
		} catch (err) {
			ctx.log.error({ msg: "PostmarkSender.send.ERROR", err });
			reference.error = getPostmarkMessageError(err as Error);
			return [reference, err as Error];
		}
	};
}
