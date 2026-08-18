import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Button, buttonVariants } from "@/src/common/components/shadcn/button.tsx";
import { RouteDestination } from "@/src/modules/tankstack/router/router.tsx";
import { Link } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Fragment, ReactNode } from "react";

type Props = {
	destination: RouteDestination;
	isBrackets?: boolean;
	isDisabled?: boolean;
	caption?: ReactNode;
	children?: ReactNode;
	tooltip?: string;
} & VariantProps<typeof buttonVariants>;

/**
 * Use this for inline anchors, ie: in paragraphs.
 */
export const LinkInternal = (p: Props) => {
	const isBrackets = p.isBrackets ?? false;
	const isDisabled = p.isDisabled ?? false;
	return (
		<Fragment>
			{isBrackets && "("}
			<Button
				//
				asChild
				className={cn({ "cursor-default hover:no-underline": isDisabled })}
				disabled={isDisabled}
				variant={p.variant ?? "link"}
				size={p.size ?? "blank"}
				tooltipHtml={p.tooltip}
			>
				<Link {...p.destination}>{p.caption ?? p.children}</Link>
			</Button>
			{isBrackets && ")"}
		</Fragment>
	);
};
