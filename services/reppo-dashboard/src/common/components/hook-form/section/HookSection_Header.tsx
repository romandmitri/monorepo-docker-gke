import { HookSection_Description } from "@/src/common/components/hook-form/section/HookSection_Description.tsx";
import { HookSection_Label } from "@/src/common/components/hook-form/section/HookSection_Label.tsx";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Fragment, ReactNode } from "react";

interface Props {
	description?: ReactNode;
	title?: ReactNode;
	actions?: ReactNode[];
}

export const HookSection_Header = (p: Props) => {
	const actions = p.actions ?? [];
	const isActions = Boolean(actions.length);
	const isHeader = Boolean(p.title) || Boolean(p.description) || isActions;
	if (!isHeader) return null;
	return (
		<div className={cn("flex flex-col gap-2")}>
			<div className={"flex flex-row items-end justify-between gap-2"}>
				<HookSection_Label>{p.title}</HookSection_Label>
				{isActions && (
					<Fragment>
						<div className={"flex flex-row items-center gap-2"}>
							{actions.map((action, index) => {
								return <Fragment key={index}>{action}</Fragment>;
							})}
						</div>
					</Fragment>
				)}
			</div>
			<HookSection_Description>{p.description}</HookSection_Description>
		</div>
	);
};
