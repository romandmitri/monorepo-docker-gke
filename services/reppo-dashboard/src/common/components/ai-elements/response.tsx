import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { type ComponentProps, memo } from "react";
import remarkBreaks from "remark-breaks";
import { Streamdown } from "streamdown";

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
	({ className, ...props }: ResponseProps) => (
		<Streamdown
			//
			className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}
			remarkPlugins={[remarkBreaks]}
			{...props}
		/>
	),
	(prevProps, nextProps) => prevProps.children === nextProps.children,
);

Response.displayName = "Response";
