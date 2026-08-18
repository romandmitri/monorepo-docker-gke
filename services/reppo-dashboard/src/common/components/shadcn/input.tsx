import {cn} from "@/src/common/components/shadcn/_/cn.ts";
import * as React from "react"

// https://ui.shadcn.com/docs/components/input

export const Input = ({className, type, ...props}: React.ComponentProps<"input">) => {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				// TODO: reidenzon - Fix the 1Password autofill...
				// https://www.1password.community/discussions/1password/how-to-over-1passwords-autofill-background-color/37163
				// see "data-come-onepassword-filled" attribute
				// "[&:-webkit-autofill]:!shadow-[inset_0_0_0px_1000px_rgb(30,30,30)]",
				// "[&:-webkit-autofill]:!text-foreground",
				// "dark:[&:-webkit-autofill]:!shadow-[inset_0_0_0px_1000px_rgb(30,30,30)]",
				// "dark:[&:-webkit-autofill]:!text-foreground",
				className
			)}
			{...props}
		/>
	)
}
