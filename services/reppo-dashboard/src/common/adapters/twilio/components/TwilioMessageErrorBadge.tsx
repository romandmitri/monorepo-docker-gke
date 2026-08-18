import { TwilioMessageReference } from "@/src/common/adapters/twilio/type/TwilioMessageReference.ts";
import { Badge } from "@/src/common/components/shadcn/badge.tsx";

type Props = {
	reference: TwilioMessageReference | undefined;
};

export const TwilioMessageErrorBadge = (p: Props) => {
	const reference = p.reference;
	if (!reference) return null;
	const error = reference.error;
	if (!error) return null;
	return (
		<Badge variant={"outline-destructive"} className={"flex flex-col items-start gap-1"}>
			<div>{error.message}</div>
		</Badge>
	);
};
