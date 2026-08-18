import { TwilioMessageError } from "@/src/common/adapters/twilio/type/TwilioMessageError.js";
import { TwilioMessageSid } from "@/src/common/adapters/twilio/type/TwilioMessageSid.js";
import { Config } from "@/src/common/config/Config.js";
import { UrlString } from "@/src/common/utility/http/Url.js";
import { PhoneNumberNumber } from "@/src/modules/phone-number/type/PhoneNumberNumber.js";

/**
 * REMINDER
 * Twilio can fail instantly, ie: if INVALID destination is given.
 * The SID is only available if API call succeeds.
 */

export type TwilioMessageReferenceDatabase = {
	to: PhoneNumberNumber;
	sid?: TwilioMessageSid;
	error?: TwilioMessageError;
};

export type TwilioMessageReferenceResponse = {
	to: PhoneNumberNumber;
	sid?: TwilioMessageSid;
	error?: TwilioMessageError;
	url?: UrlString;
};

// TODO: reidenzon - Don't be lazy, make proper class implementation.
export class TwilioMessageReference {
	static toResponse = (ref: TwilioMessageReferenceDatabase): TwilioMessageReferenceResponse => {
		const accountId = Config.Twilio_AccountSid;
		const url = `https://console.twilio.com/us1/monitor/logs/sms/${accountId}/${ref.sid}`;
		return {
			to: ref.to,
			sid: ref.sid,
			error: ref.error,
			url: ref.sid ? url : undefined,
		};
	};

	static toResponseList = (fromList: TwilioMessageReferenceDatabase[]): TwilioMessageReferenceResponse[] => {
		return fromList.map(TwilioMessageReference.toResponse);
	};
}
