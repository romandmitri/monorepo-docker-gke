import { HookForm_Description } from "@/src/common/components/hook-form/form/HookForm_Description.tsx";
import { HookForm_Dirty } from "@/src/common/components/hook-form/form/HookForm_Dirty.tsx";
import { HookForm_Error } from "@/src/common/components/hook-form/form/HookForm_Error.tsx";
import { HookForm_Title } from "@/src/common/components/hook-form/form/HookForm_Title.tsx";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { LucideProps } from "lucide-react";
import { ComponentType, HTMLAttributes, ReactNode } from "react";

interface Props {
	className?: HTMLAttributes<any>["className"];
	title?: ReactNode;
	icon?: ComponentType<LucideProps>;
	description?: ReactNode;
	isDirtyWarning?: boolean;
}

export const HookForm_Header = (p: Props) => {
	return (
		<header className={cn("col-span-full flex flex-col gap-2", p.className)}>
			<div className={"flex flex-row items-center gap-4"}>
				<HookForm_Title icon={p.icon} title={p.title} />
				<HookForm_Dirty isWarning={p.isDirtyWarning} />
			</div>
			<HookForm_Description>{p.description}</HookForm_Description>
			<HookForm_Error />
		</header>
	);
};
