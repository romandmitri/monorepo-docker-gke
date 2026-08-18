import { GoogleChatMessageText } from "@/src/common/adapters/google/chat/type/GoogleChatMessageText.js";
import { GoogleChatThreadKey } from "@/src/common/adapters/google/chat/type/GoogleChatThreadKey.js";
import { Config } from "@/src/common/config/Config.js";
import { Context } from "@/src/entry/_/Context.js";
import axios from "axios";

// https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages/create
// https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages#resource:-message
// https://developers.google.com/workspace/chat/api/reference/rest/v1/spaces.messages#Message.Thread
// https://developers.google.com/workspace/chat/quickstart/webhooks#start-reply-thread
// https://developers.google.com/workspace/chat/format-messages

export class GoogleChatter {
	static send = async (ctx: Context, threadKey: GoogleChatThreadKey, p: GoogleChatterSend) => {
		if (!Config.GoogleChatAgentUpdates) return;
		ctx.log.debug({ msg: "GoogleChatter.send", threadKey, p });
		if (ctx.isAwait) {
			await GoogleChatter.send_(ctx, threadKey, p);
		} else {
			GoogleChatter.send_(ctx, threadKey, p).catch((err) => {
				ctx.log.error({ msg: "GoogleChatter.send.ERROR", err });
			});
		}
	};

	protected static send_ = async (ctx: Context, threadKey: GoogleChatThreadKey, p: GoogleChatterSend) => {
		ctx.log.debug({ msg: "GoogleChatter.send_", threadKey, p });
		let url = Config.GoogleChatAgentUpdates + "&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD";
		ctx.log.debug({ msg: "GoogleChatter.send_.url", url });
		const response = await axios.post(url, {
			text: p.text,
			thread: { threadKey: threadKey },
		});
		ctx.log.debug({ msg: "GoogleChatter.send_.response", status: response.status, data: response.data });
	};
}

type GoogleChatterSend = {
	text: GoogleChatMessageText;
};
