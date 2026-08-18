import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { getPercentageFormat, Percentage1 } from "@/src/common/utility/number/Percentage.ts";
import { PercentageLimits } from "@/src/common/utility/number/PercentageLimits.ts";
import type { VariantProps } from "class-variance-authority";

type Props = {
	percentage: Percentage1;
	limits?: PercentageLimits;
} & VariantProps<typeof badgeVariants>;

export const PercentageIndicator = (p: Props) => {
	const percentage = p.percentage;

	const limits: PercentageLimits = p.limits ?? {
		warning: 0.5,
		error: 0.5,
	};

	return (
		<Badge
			//
			variant={"blank"}
			size={p.size}
			className={cn(
				//
				"text-sm",
				{ "text-positive": limits.warning <= percentage && percentage <= 1 },
				{ "text-warning": limits.error <= percentage && percentage < limits.warning },
				{ "text-destructive": percentage < limits.error },
			)}
		>
			{getPercentageFormat(percentage, 0)}
		</Badge>
	);
};
