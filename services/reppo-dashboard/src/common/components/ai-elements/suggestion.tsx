import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import type { ComponentProps, HTMLAttributes } from "react";

export type SuggestionsProps = HTMLAttributes<HTMLDivElement>;

export const Suggestions = ({ className, ...props }: SuggestionsProps) => <div className={cn("flex flex-wrap gap-2", className)} {...props} />;

export type SuggestionProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
	suggestion: string;
	onClick: (suggestion: string) => void;
};

export const Suggestion = ({ suggestion, onClick, className, variant = "outline", size = "sm", children, ...props }: SuggestionProps) => {
	const handleClick = () => {
		onClick(suggestion);
	};

	return (
		<Button
			className={cn("h-auto max-w-full py-1.5 text-left whitespace-normal", className)}
			onClick={handleClick}
			size={size}
			type="button"
			variant={variant}
			{...props}
		>
			{children ?? suggestion}
		</Button>
	);
};
