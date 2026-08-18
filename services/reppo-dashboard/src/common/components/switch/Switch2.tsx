import { Label } from "@/src/common/components/shadcn/label.tsx";
import { Switch } from "@/src/common/components/shadcn/switch.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/common/components/shadcn/tooltip.tsx";
import { withHtml } from "@/src/common/utility/http/Raw.tsx";
import { newUuid, Uuid } from "@/src/common/utility/uuid/Uuid.ts";
import { ReactNode, useState } from "react";

interface Props {
	caption?: ReactNode;
	isChecked?: boolean;
	isDisabled?: boolean;
	onChecked: (v: boolean) => void;
	tooltipHtml?: string;
}

export const Switch2 = (p: Props) => {
	const [id, setId] = useState<Uuid>(newUuid());

	let content = (
		<div className={"flex items-start gap-2"}>
			<Switch id={id} disabled={p.isDisabled} checked={p.isChecked ?? false} onCheckedChange={p.onChecked} />
			{p.caption && (
				<Label htmlFor={id} className={"text-muted-foreground cursor-pointer pt-0.5 pr-2"}>
					{p.caption}
				</Label>
			)}
		</div>
	);

	if (p.tooltipHtml) {
		content = (
			<Tooltip>
				<TooltipTrigger asChild>{content}</TooltipTrigger>
				<TooltipContent side={"top"} align={"center"}>
					{withHtml(p.tooltipHtml)}
				</TooltipContent>
			</Tooltip>
		);
	}

	return content;
};
