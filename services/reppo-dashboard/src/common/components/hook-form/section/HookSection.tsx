import { HookSection_Header } from "@/src/common/components/hook-form/section/HookSection_Header.tsx";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
	children?: ReactNode;
	className?: HTMLAttributes<any>["className"];
	description?: ReactNode;
	title?: ReactNode;
	actions?: ReactNode[];
}

export const HookSection = (p: Props) => {
	return (
		<div
			//
			className={cn(
				//
				"flex max-w-full flex-col gap-3",
				{ "max-w-sm": false },
				"col-span-1",
				p.className,
			)}
		>
			<HookSection_Header
				//
				description={p.description}
				title={p.title}
				actions={p.actions}
			/>
			<div className={"max-w-full"}>{p.children}</div>
		</div>
	);
};
