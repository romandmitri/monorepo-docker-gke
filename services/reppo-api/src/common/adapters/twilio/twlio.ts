import { Config } from "@/src/common/config/Config.js";
import { Context } from "@/src/entry/_/Context.js";
import { isPhoneNumberNumberValid, PhoneNumberNumber } from "@/src/modules/phone-number/type/PhoneNumberNumber.js";
import twilio from "twilio";

// https://www.twilio.com/docs
// https://www.twilio.com/docs/libraries/reference/twilio-node/

const isTwilio = (): boolean => {
	if (!Config.Twilio_AccountSid) return false;
	if (!Config.Twilio_AuthToken) return false;
	if (!Config.Twilio_SipTrunk_Sid) return false;
	if (!Config.Twilio_SipTrunk_TerminationUri) return false;
	if (!Config.Twilio_SipTrunk_Username) return false;
	if (!Config.Twilio_SipTrunk_Password) return false;
	return true;
};

export const getTwilioClient = (ctx: Context) => {
	if (!isTwilio()) {
		ctx.log.error({ msg: "getTwilioClient.FAIL" });
		return;
	}
	return twilio(Config.Twilio_AccountSid, Config.Twilio_AuthToken, {});
};

export const getTwilioFromNumber = (): PhoneNumberNumber | undefined => {
	const fromNumber = Config.Twilio_FromNumber;
	if (!isPhoneNumberNumberValid(fromNumber)) return;
	return fromNumber;
};
