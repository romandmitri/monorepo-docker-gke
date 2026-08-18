import { Badge, BadgeVariant } from "@/src/common/components/shadcn/badge.tsx";
import { ContextLocation } from "@/src/common/utility/context/ContextLocation.ts";
import { Fragment, HTMLAttributes } from "react";

interface Props {
	location: ContextLocation | undefined;
	className?: HTMLAttributes<any>["className"];
}

export const ContextLocationIndicator = (p: Props) => {
	const loc = p.location;
	if (!loc) return null;

	let variant: BadgeVariant = "outline-muted";

	// TODO: reidenzon - Consider using shorthand names.
	if (loc == "j_AgentUpdate_Logic.execute.executor") variant = "outline-warning";
	if (loc == "j_AgentUpdate_Logic.execute.conformer") variant = "outline-developer";
	if (loc == "api_POST_agent_version_conform") variant = "outline-developer";

	return (
		<Fragment>
			<Badge variant={variant}>{loc}</Badge>
		</Fragment>
	);
};
