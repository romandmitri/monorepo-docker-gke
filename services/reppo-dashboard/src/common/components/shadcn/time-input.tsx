import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import * as React from "react";

export interface TimeInputProps extends Omit<React.ComponentProps<"input">, "type"> {}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(({ className, ...props }, ref) => {
	return (
		<input
			ref={ref}
			type="time"
			data-slot="time-input"
			className={cn(
				"border-input bg-background placeholder:text-muted-foreground h-9 w-21 rounded-md border px-2 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
				"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				// Hide the native picker indicator
				"appearance-none",
				"[&::-webkit-calendar-picker-indicator]:hidden",
				"[&::-webkit-calendar-picker-indicator]:appearance-none",
				className,
			)}
			{...props}
		/>
	);
});

TimeInput.displayName = "TimeInput";
