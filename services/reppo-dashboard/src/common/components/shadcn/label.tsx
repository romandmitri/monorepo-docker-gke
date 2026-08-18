import {cn} from "@/src/common/components/shadcn/_/cn.ts";
import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

// https://ui.shadcn.com/docs/components/label

export const Label = ({className, ...props}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className
			)}
			{...props}
		/>
	)
}
