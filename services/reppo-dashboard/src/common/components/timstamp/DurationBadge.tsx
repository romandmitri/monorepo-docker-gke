import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.ts";
import type { VariantProps } from "class-variance-authority";
import { LucideTimer } from "lucide-react";
import prettyMilliseconds from "pretty-ms";
import * as React from "react";

type Props = {
	label?: string;
	isIcon?: boolean;
	duration?: TimeMillisecond;
} & VariantProps<typeof badgeVariants>;

export const DurationBadge = (p: Props) => {
	const duration = p.duration;
	if (duration == undefined) return null;

	let tooltip: string | undefined;
	if (p.label) tooltip = p.label;

	return (
		<Badge
			//
			tooltipHtml={tooltip}
			variant={p.variant ?? "outline"}
			size={p.size ?? "xs"}
		>
			{p.isIcon && <LucideTimer />}
			{prettyMilliseconds(duration, {
				colonNotation: true,
				unitCount: 2,
				secondsDecimalDigits: 0,
			})}
		</Badge>
	);
};
