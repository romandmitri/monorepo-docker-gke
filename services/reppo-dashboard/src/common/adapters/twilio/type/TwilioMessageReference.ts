import { TwilioMessageError } from "@/src/common/adapters/twilio/type/TwilioMessageError.ts";
import { TwilioMessageSid } from "@/src/common/adapters/twilio/type/TwilioMessageSid.ts";
import { UrlString } from "@/src/common/utility/http/Url.ts";
import { PhoneNumberNumber } from "@/src/modules/phone-number/type/PhoneNumberNumber.ts";

export type TwilioMessageReference = {
	to: PhoneNumberNumber;
	sid?: TwilioMessageSid;
	error?: TwilioMessageError;
	url?: UrlString;
};
