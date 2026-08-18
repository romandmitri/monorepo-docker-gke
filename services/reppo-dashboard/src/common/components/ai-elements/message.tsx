import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/common/components/shadcn/avatar.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/common/components/shadcn/tooltip.tsx";
import type { UIMessage } from "ai";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, HTMLAttributes } from "react";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
	from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
	<div
		className={cn(
			//
			"group flex w-full items-end justify-end gap-2",
			from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
			className,
		)}
		{...props}
	/>
);

const messageContentVariants = cva("is-user:dark flex flex-col gap-2 overflow-hidden rounded-lg text-sm", {
	variants: {
		variant: {
			contained: [
				"max-w-[80%] px-3 py-2",
				"group-[.is-user]:bg-primary",
				"group-[.is-user]:text-primary-foreground",
				"group-[.is-user]:[&_a]:text-primary-foreground",
				"group-[.is-assistant]:bg-secondary",
				"group-[.is-assistant]:text-foreground",
				"group-[.is-assistant]:[&_a]:text-foreground",
			],
			flat: [
				"group-[.is-user]:max-w-[80%] group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground",
				"group-[.is-assistant]:text-foreground",
			],
		},
	},
	defaultVariants: {
		variant: "contained",
	},
});

export type MessageContentProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof messageContentVariants>;

export const MessageContent = ({ children, className, variant, ...props }: MessageContentProps) => (
	<div className={cn(messageContentVariants({ variant, className }))} {...props}>
		{children}
	</div>
);

export type MessageActionsProps = ComponentProps<"div">;

export const MessageActions = ({ className, children, ...props }: MessageActionsProps) => (
	<div className={cn("flex items-center gap-1", className)} {...props}>
		{children}
	</div>
);

export type MessageActionProps = ComponentProps<typeof Button> & {
	tooltip?: string;
	label?: string;
};

export const MessageAction = ({ tooltip, children, label, variant = "ghost", size = "icon-sm", ...props }: MessageActionProps) => {
	const button = (
		<Button size={size} type="button" variant={variant} {...props}>
			{children}
			<span className="sr-only">{label || tooltip}</span>
		</Button>
	);

	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>{button}</TooltipTrigger>
					<TooltipContent>
						<p>{tooltip}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return button;
};

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
	src: string;
	name?: string;
};

export const MessageAvatar = ({ src, name, className, ...props }: MessageAvatarProps) => (
	<Avatar className={cn("ring-border size-8 ring-1", className)} {...props}>
		<AvatarImage alt="" className="mt-0 mb-0" src={src} />
		<AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
	</Avatar>
);
