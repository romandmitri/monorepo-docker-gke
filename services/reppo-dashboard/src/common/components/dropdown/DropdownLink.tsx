import {DropdownMenuItem} from "@/src/common/components/shadcn/dropdown-menu.tsx";
import {RouteDestination} from "@/src/modules/tankstack/router/router.tsx";
import {Link, useMatchRoute} from "@tanstack/react-router";
import {LucideProps} from "lucide-react";
import * as React from "react";
import {ComponentType, ReactNode} from "react";

interface Props {
	destination: RouteDestination;
	isActivate?: boolean;
	icon?: ComponentType<LucideProps>;
	title?: ReactNode;
	children?: ReactNode;
}

export const DropdownLink = (p: Props) => {
	const destination = p.destination;
	const matchRoute = useMatchRoute();
	const match = matchRoute({...destination});
	const isActivate = p.isActivate ?? true;
	const isActive = isActivate && Boolean(match);
	// consoleLog("LayoutSidebarLink", isActive, match);

	return <DropdownMenuItem asChild>
		<Link {...destination}>
			{p.icon && <p.icon className={"size-4"}/>}
			<span>{p.title}</span>
			{p.children}
		</Link>
	</DropdownMenuItem>
}
