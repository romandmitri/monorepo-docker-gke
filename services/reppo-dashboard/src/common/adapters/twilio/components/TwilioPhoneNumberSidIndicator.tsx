import { TwilioPhoneNumberReferenceResponse } from "@/src/common/adapters/twilio/type/TwilioPhoneNumberReference.ts";
import { ButtonGroup, ButtonGroupText } from "@/src/common/components/shadcn/button-group.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { UuidIndicator } from "@/src/common/utility/uuid/UuidIndicator.tsx";
import { ClipboardButton_WriteText } from "@/src/modules/clipboard/ClipboardButton_WriteText.tsx";
import { LucideExternalLink } from "lucide-react";

interface Props {
	reference?: TwilioPhoneNumberReferenceResponse;
}

export const TwilioPhoneNumberSidIndicator = (p: Props) => {
	const reference = p.reference;
	if (!reference) return null;
	const sid = reference.sid;
	if (!sid) return null;

	return (
		<ButtonGroup>
			<ButtonGroupText className={"text-xs"}>{"Twilio"}</ButtonGroupText>
			<ButtonGroupText>{<UuidIndicator id={sid} size={"2xs"} />}</ButtonGroupText>
			<ClipboardButton_WriteText data={sid} size={"icon-xs"} />
			<Button
				//
				asChild
				tooltipHtml={`Open in Twilio.`}
				variant={"outline"}
				size={"icon-xs"}
			>
				<a href={`https://console.twilio.com/us1/develop/phone-numbers/manage/incoming/${sid}/properties`} target={"_blank"}>
					<LucideExternalLink />
				</a>
			</Button>
		</ButtonGroup>
	);
};
