import {Config} from "@/src/common/config/Config.js";
import {HttpHeader} from "@/src/common/utility/http/HttpHeader.js";
import {MimeType2} from "@/src/common/utility/mime/MimeType2.js";
import {Context} from "@/src/entry/_/Context.js";
import {ClientOptions} from "postmark/dist/client/models/index.js";
import HttpMethod = ClientOptions.HttpMethod;

// A short URL, ie: https://link.reppo.app/abc...
export type ShortUrl = string;

const isShort = (): boolean => {
	if (Config.Short_Domain == "") return false;
	if (Config.Short_Key == "") return false;
	return true;
};

export const getShortUrl = async (ctx: Context, long: string): Promise<ShortUrl | string> => {
	ctx.log.debug({msg: "Short.url.long", long});

	if (!isShort()) return long;

	// https://developers.short.io/docs/creating-your-first-short-link
	const response = await fetch("https://api.short.io/links", {
		method: HttpMethod.POST,
		headers: {
			[HttpHeader.Accept]: MimeType2.ApplicationJson,
			[HttpHeader.Authorization]: Config.Short_Key,
			[HttpHeader.ContentType]: MimeType2.ApplicationJson,
		},
		body: JSON.stringify({
			domain: Config.Short_Domain,
			originalURL: long,
		}),
	});

	const json = (await response.json()) as {
		idString: string;
		path: string;
		shortURL: string;
		success: boolean;
	};

	ctx.log.debug({msg: "Short.url.response", response});
	ctx.log.info({msg: "Short.url.json", json});

	if (!json.success) return long;

	return json.shortURL ?? long;
};
