import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { HookForm_Dirty } from "@/src/common/components/hook-form/form/HookForm_Dirty.tsx";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
	className?: HTMLAttributes<any>["className"];
	children?: ReactNode;
	isDirtyWarning?: boolean;
}

export const HookForm_Footer = (p: Props) => {
	return (
		<div className={cn("col-span-full flex items-center justify-end space-x-4", p.className)}>
			<HookForm_Dirty isWarning={p.isDirtyWarning} />
			{p.children}
		</div>
	);
};
