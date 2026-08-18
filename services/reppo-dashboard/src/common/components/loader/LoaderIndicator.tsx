import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { LucideLoaderCircle } from "lucide-react";
import { HTMLAttributes } from "react";

interface Props {
	className?: HTMLAttributes<any>["className"];
	isLoading?: boolean;
}

export const LoaderIndicator = (p: Props) => {
	const isLoading = p.isLoading;
	if (!isLoading) return null;
	return <LucideLoaderCircle className={cn("animate-spin", p.className)} />;
};
