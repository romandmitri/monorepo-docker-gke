import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { HumanId } from "@/src/common/utility/human-id/HumanId.ts";
import { DeveloperLabel } from "@/src/modules/developer/component/DeveloperLabel.tsx";
import { RootBox } from "@/src/modules/root/components/RootBox.tsx";
import { VariantProps } from "class-variance-authority";

type Props = {
	humanId: HumanId | undefined;
	isRoot?: boolean;
} & VariantProps<typeof badgeVariants>;

export const HumanIdIndicator = (p: Props) => {
	const humanId = p.humanId;
	if (!humanId) return null;

	let content = (
		<Badge variant={p.variant ?? "secondary"}>
			<DeveloperLabel label={"HumanId"} />
			{humanId}
		</Badge>
	);

	if (p.isRoot) content = <RootBox>{content}</RootBox>;

	return content;
};
