import { TwilioPhoneNumberSid } from "@/src/common/adapters/twilio/type/TwilioPhoneNumberSid.js";
import { AuditDelta, joinDelta } from "@/src/modules/audit/type/AuditDelta.js";
import { AuditDetails, getChange2 } from "@/src/modules/audit/type/AuditDetails.js";

export interface TwilioPhoneNumberReferenceDatabase {
	sid?: TwilioPhoneNumberSid;
}

export interface TwilioPhoneNumberReferenceRequest {
	sid?: TwilioPhoneNumberSid;
}

export interface TwilioPhoneNumberReferenceResponse {
	sid?: TwilioPhoneNumberSid;
}

export class TwilioPhoneNumberReference {
	sid?: TwilioPhoneNumberSid;

	constructor(p: {
		//
		sid?: TwilioPhoneNumberSid;
	}) {
		this.sid = p.sid;
	}

	static fromDatabase = (from?: TwilioPhoneNumberReferenceDatabase): TwilioPhoneNumberReference | undefined => {
		if (!from) return;
		return new TwilioPhoneNumberReference({
			sid: from.sid,
		});
	};

	static fromRequest = (from?: TwilioPhoneNumberReferenceRequest): TwilioPhoneNumberReference | undefined => {
		if (!from) return;
		return new TwilioPhoneNumberReference({
			sid: from.sid,
		});
	};

	static populateAudit = (from: TwilioPhoneNumberReference | undefined, to: TwilioPhoneNumberReference | undefined, d: AuditDetails = {}): AuditDetails => {
		d.phoneNumber_details_twilioReference_sid = getChange2(from?.sid, to?.sid);
		return d;
	};

	clone = (): TwilioPhoneNumberReference => {
		const from = this;
		return new TwilioPhoneNumberReference({
			sid: from.sid,
		});
	};

	toDatabase = (): TwilioPhoneNumberReferenceDatabase => {
		return {
			sid: this.sid,
		};
	};

	toDelta = (): AuditDelta => {
		return joinDelta([this.sid]);
	};

	toResponse = (): TwilioPhoneNumberReferenceResponse => {
		return {
			sid: this.sid,
		};
	};
}
