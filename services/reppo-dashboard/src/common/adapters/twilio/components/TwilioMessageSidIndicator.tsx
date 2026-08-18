import { TwilioMessageReference } from "@/src/common/adapters/twilio/type/TwilioMessageReference.ts";
import { LinkExternal } from "@/src/common/components/link/LinkExternal.tsx";
import { ButtonGroup, ButtonGroupText } from "@/src/common/components/shadcn/button-group.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { UuidIndicator } from "@/src/common/utility/uuid/UuidIndicator.tsx";
import { ClipboardButton_WriteText } from "@/src/modules/clipboard/ClipboardButton_WriteText.tsx";
import { LucideExternalLink } from "lucide-react";

interface Props {
	reference: TwilioMessageReference | undefined;
}

export const TwilioMessageSidIndicator = (p: Props) => {
	const reference = p.reference;
	if (!reference) return null;
	const sid = reference.sid;
	if (!sid) return null;
	const url = reference.url;
	return (
		<ButtonGroup>
			<ButtonGroupText className={"px-1"}>
				<UuidIndicator label={"Sid"} id={sid} left={2} right={4} />
			</ButtonGroupText>
			<ClipboardButton_WriteText data={sid} size={"icon-xs"} />
			<LinkExternal href={url} />
			{url && (
				<Button
					//
					asChild
					tooltipHtml={`Open in Twilio.`}
					variant={"outline"}
					size={"icon-xs"}
				>
					<a href={url} target={"_blank"}>
						<LucideExternalLink />
					</a>
				</Button>
			)}
		</ButtonGroup>
	);
};
