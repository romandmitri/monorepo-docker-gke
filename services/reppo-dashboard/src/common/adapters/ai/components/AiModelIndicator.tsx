import { getAiModelInfo } from "@/src/common/adapters/ai/type/AiModel.ts";
import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { GatewayModelId } from "@ai-sdk/gateway";
import type { VariantProps } from "class-variance-authority";

type Props = {
	model: GatewayModelId | undefined;
} & VariantProps<typeof badgeVariants>;

export const AiModelIndicator = (p: Props) => {
	const model = p.model;
	if (!model) return null;
	const modelInfo = getAiModelInfo(model);
	return (
		<Badge
			//
			variant={p.variant ?? modelInfo.badgeVariant ?? "blank"}
		>
			{model}
		</Badge>
	);
};
