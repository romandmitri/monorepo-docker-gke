import { TwilioMessageErrorBadge } from "@/src/common/adapters/twilio/components/TwilioMessageErrorBadge.tsx";
import { TwilioMessageSidIndicator } from "@/src/common/adapters/twilio/components/TwilioMessageSidIndicator.tsx";
import { TwilioMessageStatusIndicator } from "@/src/common/adapters/twilio/components/TwilioMessageStatusIndicator.tsx";
import { TwilioMessageReference } from "@/src/common/adapters/twilio/type/TwilioMessageReference.ts";
import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { SessionNotificationTypeIndicator } from "@/src/modules/job/type/type/session-notifier/notification/components/SessionNotificationTypeIndicator.tsx";
import { SessionNotificationType } from "@/src/modules/job/type/type/session-notifier/notification/SessionNotificationType.ts";
import { PhoneNumberNumberIndicator } from "@/src/modules/phone-number/components/PhoneNumberNumberIndicator.tsx";

type Props = {
	reference: TwilioMessageReference;
};

export const TwilioMessageReferenceBadge = (p: Props) => {
	const reference = p.reference;
	return (
		<Badge variant={"blank"} className={"gap-2"}>
			<SessionNotificationTypeIndicator type={SessionNotificationType.Sms} />
			<PhoneNumberNumberIndicator number={reference.to} variant={"secondary"} />
			<TwilioMessageStatusIndicator reference={reference} />
			<TwilioMessageSidIndicator reference={reference} />
			<TwilioMessageErrorBadge reference={reference} />
		</Badge>
	);
};
