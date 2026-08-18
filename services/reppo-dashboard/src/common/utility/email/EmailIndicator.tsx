import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { Email } from "@/src/common/utility/email/Email.ts";

interface Props {
	email?: Email;
}

export const EmailIndicator = (p: Props) => {
	if (!p.email) return null;
	return <Badge variant={"secondary"}>{p.email}</Badge>;
};
