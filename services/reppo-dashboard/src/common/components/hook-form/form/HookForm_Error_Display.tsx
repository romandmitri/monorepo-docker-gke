import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { withHtml } from "@/src/common/utility/http/Raw.tsx";
import { ReactNode } from "react";

interface Props {
	error?: ReactNode;
}

export const HookForm_Error_Display = (p: Props) => {
	const error = p.error;
	if (!error) return null;

	let content: ReactNode = error;
	if (typeof error == "string") content = withHtml(error);

	return <div className={cn("text-destructive text-sm")}>{content}</div>;
};
