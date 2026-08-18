import { badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { DurationBadge } from "@/src/common/components/timstamp/DurationBadge.tsx";
import { TimeUnix } from "@/src/common/utility/time/TimeUnix.ts";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { useEffect, useState } from "react";

type Props = {
	label?: string;
	started: TimeUnix | undefined;
	ended: TimeUnix | undefined;
	isIcon?: boolean;
	isProgress?: boolean;
} & VariantProps<typeof badgeVariants>;

export const DurationBadgeTicker = (p: Props) => {
	const started = p.started;
	const isProgress = p.isProgress;

	const [ended, setEnded] = useState<TimeUnix | undefined>(p.ended);

	useEffect(() => {
		if (!isProgress || p.ended !== undefined) return setEnded(p.ended);

		setEnded(Date.now());
		const ticker = window.setInterval(() => setEnded(Date.now()), 1000);
		return () => window.clearInterval(ticker);
	}, [isProgress, p.ended]);

	if (started === undefined) return null;
	if (ended === undefined) return null;

	const duration = ended - started;

	return (
		<DurationBadge
			//
			label={p.label}
			duration={duration}
			isIcon={p.isIcon}
			variant={isProgress ? "developer" : "outline"}
		/>
	);
};
