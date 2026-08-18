import { TwilioMessageReference } from "@/src/common/adapters/twilio/type/TwilioMessageReference.ts";
import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { ThemeIcon } from "@/src/common/style/ThemeIcon.tsx";
import { Fragment } from "react";

interface Props {
	reference: TwilioMessageReference | undefined;
}

export const TwilioMessageStatusIndicator = (p: Props) => {
	const reference = p.reference;
	if (!reference) return null;
	const isSid = Boolean(reference.sid);
	const isError = Boolean(reference.error);

	return (
		<Fragment>
			{isSid && (
				<Badge variant={"outline-positive"}>
					<ThemeIcon.Common_Success />
					{"Sent"}
				</Badge>
			)}
			{isError && (
				<Badge variant={"outline-destructive"}>
					<ThemeIcon.Common_Error />
					{"Error"}
				</Badge>
			)}
		</Fragment>
	);
};
