import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
	children?: ReactNode;
	className?: HTMLAttributes<any>["className"];
}

export const HookField_Nested = (p: Props) => {
	if (!p.children) return null;
	return (
		<div
			className={cn(
				//
				"flex flex-col gap-6",
				// "border-secondary rounded-sm border-2 p-3",
				// "border-secondary border-l-4 p-3",
				p.className,
			)}
		>
			{p.children}
		</div>
	);
};
