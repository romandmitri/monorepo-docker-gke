import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

export const HookSection_Description = (p: Props) => {
	if (!p.children) return null;
	return <div className={cn("text-muted-foreground text-sm")}>{p.children}</div>;
};
