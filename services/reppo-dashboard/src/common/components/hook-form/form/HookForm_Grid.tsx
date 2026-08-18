import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";

export const gridVariants = cva("grid grid-cols-1 col-span-full gap-6 px-6", {
	variants: {
		variant: {
			"max-1": "",
			"max-2": "md:grid-cols-2",
			"max-3": "md:grid-cols-2 lg:grid-cols-3",
			"max-4": "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
		},
	},
	defaultVariants: {
		variant: "max-1",
	},
});

type Props = {
	className?: HTMLAttributes<any>["className"];
	children?: ReactNode;
} & VariantProps<typeof gridVariants>;

export const HookForm_Grid = (p: Props) => {
	return (
		<div
			className={cn(
				//
				gridVariants({ variant: p.variant }),
				p.className,
			)}
		>
			{p.children}
		</div>
	);
};
