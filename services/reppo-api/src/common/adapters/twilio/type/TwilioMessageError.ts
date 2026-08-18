import twilio from "twilio";

export type TwilioMessageError = {
	code?: twilio.RestException["code"];
	message: twilio.RestException["message"] | Error["message"];
	moreInfo?: twilio.RestException["moreInfo"];
};

export const getTwilioMessageError = (err: Error): TwilioMessageError => {
	if (err instanceof twilio.RestException) {
		return {
			code: err.code,
			message: err.message,
			moreInfo: err.moreInfo,
		};
	}
	return {
		message: err.message,
	};
};
