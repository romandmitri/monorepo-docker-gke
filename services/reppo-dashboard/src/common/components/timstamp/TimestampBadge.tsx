import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { getTimeStringLocalDatetime, TimeString } from "@/src/common/utility/time/TimeString.ts";
import { VariantProps } from "class-variance-authority";
import * as React from "react";

type Props = {
	label?: string;
	time: TimeString | undefined;
} & VariantProps<typeof badgeVariants>;

export const TimestampBadge = (p: Props) => {
	const time = p.time;
	if (!time) return;

	const timeDisplay = getTimeStringLocalDatetime(time);
	if (!timeDisplay) return;

	let tooltip = [];
	if (p.label) tooltip.push(p.label);
	// TODO: reidenzon - Push detailed time (with year, and seconds) into tooltip?!

	return (
		<Badge
			//
			tooltipHtml={tooltip.join(" ")}
			variant={p.variant ?? "secondary"}
			className={""}
		>
			<span
				className={cn({
					// "font-mono text-xs tracking-tighter",
				})}
			>
				{timeDisplay}
			</span>
		</Badge>
	);
};
