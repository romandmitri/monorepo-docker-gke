import { getTwilioClient, getTwilioFromNumber } from "@/src/common/adapters/twilio/twlio.js";
import { getTwilioMessageError } from "@/src/common/adapters/twilio/type/TwilioMessageError.js";
import { TwilioMessageReferenceDatabase } from "@/src/common/adapters/twilio/type/TwilioMessageReferenceDatabase.js";
import { Context } from "@/src/entry/_/Context.js";
import { PhoneNumberNumber } from "@/src/modules/phone-number/type/PhoneNumberNumber.js";

export abstract class TwilioSender {
	static send = async (
		ctx: Context,
		p: {
			from?: PhoneNumberNumber;
			to: PhoneNumberNumber;
			body: string;
		},
	): Promise<[TwilioMessageReferenceDatabase, Error | undefined]> => {
		ctx.log.debug({ msg: "TwilioSender.send", p });

		const reference: TwilioMessageReferenceDatabase = {
			to: p.to,
		};

		const twilioClient = getTwilioClient(ctx);
		if (!twilioClient) {
			const err = new Error("TwilioSender.send.CLIENT");
			reference.error = getTwilioMessageError(err);
			return [reference, err];
		}

		const from = p.from ?? getTwilioFromNumber();
		if (!from) {
			const err = new Error("TwilioSender.send.FROM");
			reference.error = getTwilioMessageError(err);
			return [reference, err];
		}

		try {
			ctx.log.debug({ msg: "TwilioSender.send.create", p });
			const response = await twilioClient.messages.create({
				from: from,
				to: p.to,
				body: p.body,
			});
			ctx.log.debug({ msg: "TwilioSender.send.response", response });
			reference.sid = response.sid;
			return [reference, undefined];
		} catch (err) {
			// TODO: reidenzon - Twilio DOES generate an SID in their database but thrown Error prevents access to it here :(
			ctx.log.error({ msg: "TwilioSender.send.ERROR", err });
			reference.error = getTwilioMessageError(err as Error);
			return [reference, err as Error];
		}
	};
}
