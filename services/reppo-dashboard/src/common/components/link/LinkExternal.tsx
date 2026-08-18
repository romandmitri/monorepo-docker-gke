import { Button, buttonVariants } from "@/src/common/components/shadcn/button.tsx";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Fragment, ReactNode } from "react";

type Props = {
	href?: string;
	isBrackets?: boolean;
	caption?: ReactNode;
	children?: ReactNode;
	tooltip?: string;
} & VariantProps<typeof buttonVariants>;

/**
 * Use this for inline anchors, ie: in paragraphs.
 */
export const LinkExternal = (p: Props) => {
	const href = p.href;
	const isBrackets = p.isBrackets ?? false;
	return (
		<Fragment>
			{isBrackets && "("}
			<Button
				//
				asChild
				variant={p.variant ?? "link"}
				size={p.size ?? "blank"}
				tooltipHtml={p.tooltip}
			>
				<a href={href} target={"_blank"}>
					{p.caption ?? p.children}
				</a>
			</Button>
			{isBrackets && ")"}
		</Fragment>
	);
};
