import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
	children?: ReactNode;
	className?: HTMLAttributes<any>["className"];
}

export const HookForm_Row = (p: Props) => {
	return <div className={cn("flex flex-wrap gap-4", p.className)}>{p.children}</div>;
};
