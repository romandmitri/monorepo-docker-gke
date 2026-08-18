import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { ContextMode, getContextModeInfo } from "@/src/common/utility/context/ContextMode.tsx";
import { HTMLAttributes } from "react";

interface Props {
	mode: ContextMode;
	className?: HTMLAttributes<any>["className"];
}

export const ContextModeIndicator = (p: Props) => {
	const mode = p.mode;
	const modeInfo = getContextModeInfo(mode);
	return (
		<div className={p.className}>
			<Badge variant={modeInfo.badgeVariant ?? "outline"}>{modeInfo.name}</Badge>
		</div>
	);
};
