import { HookField_Error } from "@/src/common/components/hook-form/field/HookField_Error.tsx";
import { HookField_Header } from "@/src/common/components/hook-form/field/HookField_Header.tsx";
import { HookField_Nested } from "@/src/common/components/hook-form/field/HookField_Nested.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { HTMLAttributes, ReactNode } from "react";

interface Props {
	children?: ReactNode;
	className?: HTMLAttributes<any>["className"];
	description?: ReactNode;
	label?: ReactNode;
	isOptional?: boolean;
	name: HookFieldName;
	actions?: ReactNode[];
	nested?: ReactNode;
}

export const HookField = (p: Props) => {
	return (
		<div
			//
			className={cn(
				//
				"flex max-w-full flex-col gap-3",
				{ "max-w-sm": false },
				{ "border-l-4 pl-3": Boolean(p.nested) },
				"col-span-1",
				p.className,
			)}
		>
			<HookField_Header
				//
				description={p.description}
				label={p.label}
				isOptional={p.isOptional}
				name={p.name}
				actions={p.actions}
			/>
			<div className={"max-w-full"}>{p.children}</div>
			{/*<HookField_Description>{p.description}</HookField_Description>*/}
			<HookField_Error name={p.name} />
			<HookField_Nested className={"mt-2"}>{p.nested}</HookField_Nested>
		</div>
	);
};
