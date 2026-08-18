import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/common/components/shadcn/popover.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/common/components/shadcn/tooltip.tsx";
import { withHtml } from "@/src/common/utility/http/Raw.tsx";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ReactNode } from "react";

const badgeVariants = cva(
	"inline-flex items-center p-1 justify-center rounded-md border text-xs font-medium w-fit [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden shrink-0",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				// Custom.
				blank: "border-none p-0 rounded-none",
				developer: "border-transparent bg-developer text-white dark:bg-developer/40",
				positive: "border-transparent bg-positive text-white dark:bg-positive/40",
				muted: "border-none p-0 rounded-none text-muted-foreground text-xs",
				warning: "border-transparent bg-warning text-white dark:bg-warning/40",
				"outline-developer": "border-developer text-developer dark:border-developer/40",
				"outline-destructive": "border-destructive text-destructive dark:border-destructive/40",
				"outline-muted": "border-muted-foreground text-muted-foreground dark:border-muted-foreground/40",
				"outline-positive": "border-positive text-positive dark:border-positive/40",
				"outline-warning": "border-warning text-warning dark:border-warning/40",
				"outline-root": "border-root text-root dark:border-root/40",
			},
			size: {
				default: "",
				icon: "",
				"2xs": "h-4 rounded-sm gap-1 px-1 has-[>svg]:px-1",
				xs: "h-6 rounded-md gap-1 px-1 has-[>svg]:px-1.5",
				sm: "h-7 rounded-md gap-1.5 px-2 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

function Badge({
	//
	className,
	popoverContent,
	tooltip,
	tooltipHtml,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & {
		//
		asChild?: boolean;
		popoverContent?: ReactNode;
		/** @deprecated Use {@link tooltipHtml} instead. */
		tooltip?: string | React.ComponentProps<typeof TooltipContent>;
		tooltipHtml?: string;
	}) {
	const Comp = asChild ? Slot : "span";
	let content = <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;

	if (popoverContent) {
		content = (
			<Popover>
				<PopoverTrigger asChild>{content}</PopoverTrigger>
				<PopoverContent className={"max-w-128 min-w-96"}>{popoverContent}</PopoverContent>
			</Popover>
		);
	}

	if (tooltipHtml) tooltip = { children: withHtml(tooltipHtml) };
	if (tooltip) {
		if (typeof tooltip == "string") tooltip = { children: tooltip };
		content = (
			<Tooltip>
				<TooltipTrigger asChild>{content}</TooltipTrigger>
				<TooltipContent side={"top"} align={"center"} {...tooltip} />
			</Tooltip>
		);
	}

	return content;
}

export { Badge, badgeVariants };
