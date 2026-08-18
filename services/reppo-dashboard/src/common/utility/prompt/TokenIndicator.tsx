import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { PromptLength } from "@/src/common/utility/prompt/PromptLength.ts";
import { VariantProps } from "class-variance-authority";

type Props = {
	length: PromptLength;
} & VariantProps<typeof badgeVariants>;

export const TokenIndicator = (p: Props) => {
	return (
		<Badge
			//
			variant={p.variant ?? "secondary"}
			size={"2xs"}
		>{`~${p.length} tokens`}</Badge>
	);
};
