import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { StringFormatter } from "@/src/common/utility/string/StringFormatter.ts";
import { Uuid } from "@/src/common/utility/uuid/Uuid.ts";
import { DeveloperLabel } from "@/src/modules/developer/component/DeveloperLabel.tsx";
import type { VariantProps } from "class-variance-authority";
import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

type Props = {
	label?: string;
	icon?: ComponentType<LucideProps>;
	id: Uuid | undefined;
	left?: number;
	right?: number;
} & VariantProps<typeof badgeVariants>;

export const UuidIndicator = (p: Props) => {
	if (!p.id) return null;
	let tooltip = [p.label, `<b>${p.id}</b>`].filter(Boolean).join(": ");
	return (
		<Badge variant={p.variant ?? "blank"} tooltipHtml={tooltip}>
			<DeveloperLabel label={p.label} />
			{p.icon && <p.icon />}
			<div>{StringFormatter.truncate(p.id, p.left, p.right)}</div>
		</Badge>
	);
};
