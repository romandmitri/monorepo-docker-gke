import twilio from "twilio";

export type TwilioMessageError = {
	code?: twilio.RestException["code"];
	message?: twilio.RestException["message"] | Error["message"];
	moreInfo?: twilio.RestException["moreInfo"];
};
