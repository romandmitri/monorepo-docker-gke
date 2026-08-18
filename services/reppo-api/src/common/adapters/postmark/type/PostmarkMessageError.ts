import { PostmarkError } from "postmark/dist/client/errors/index.js";

export type PostmarkMessageError = {
	code?: PostmarkError["code"];
	message: PostmarkError["message"] | Error["message"];
};

export const getPostmarkMessageError = (err: Error): PostmarkMessageError => {
	if (err instanceof PostmarkError) {
		return {
			code: err.code,
			message: err.message,
		};
	}
	return {
		message: err.message,
	};
};
