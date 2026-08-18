import { LoaderControls } from "@/src/common/components/loader/LoaderControls.tsx";
import { LoaderIndicator } from "@/src/common/components/loader/LoaderIndicator.tsx";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { RootBox } from "@/src/modules/root/components/RootBox.tsx";
import { RootContext } from "@/src/modules/root/context/RootContext.ts";
import { ReactNode, useContext } from "react";

interface Props {
	actions?: ReactNode;
	children?: ReactNode;
	component?: ReactNode;
	isLoading?: boolean;
	isMain?: boolean;
}

export const Loader = (p: Props) => {
	const rootContext = useContext(RootContext);
	const shouldShowBadge = rootContext?.isShow ?? false;

	const isLoading = p.isLoading;
	// const isLoading = true;
	if (!isLoading) return <>{p.children}</>;

	return (
		<div
			className={cn(
				//
				"flex h-screen w-screen flex-col items-center justify-center gap-4",
				{ "h-max w-max": p.isMain },
			)}
		>
			<LoaderIndicator isLoading />
			{shouldShowBadge && (
				<RootBox>
					<Badge variant={"outline"}>{p.component}</Badge>
				</RootBox>
			)}
			<LoaderControls actions={p.actions} />
		</div>
	);
};
