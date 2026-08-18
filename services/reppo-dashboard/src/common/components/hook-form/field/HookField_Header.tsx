import { HookField_Description } from "@/src/common/components/hook-form/field/HookField_Description.tsx";
import { HookField_Label } from "@/src/common/components/hook-form/field/HookField_Label.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Fragment, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	description?: ReactNode;
	label?: ReactNode;
	isOptional?: boolean;
	name: HookFieldName;
	actions?: ReactNode[];
}

export const HookField_Header = (p: Props) => {
	const methods = useFormContext();
	const fieldState = methods.getFieldState(p.name, methods.formState); // register
	const error = fieldState.error;
	const actions = p.actions ?? [];
	const isActions = Boolean(actions.length);
	const isHeader = Boolean(p.label) || Boolean(p.description) || isActions;
	if (!isHeader) return null;
	return (
		<div className={cn("flex flex-col gap-2", { "text-destructive": error })}>
			<div className={"flex flex-row items-end justify-between gap-2"}>
				<HookField_Label for={p.name} isOptional={p.isOptional}>
					{p.label}
				</HookField_Label>
				{isActions && (
					<Fragment>
						<div className={"flex flex-row items-center gap-2"}>
							{actions.map((action, index) => {
								return <Fragment key={index}>{action}</Fragment>;
							})}
						</div>
					</Fragment>
				)}
			</div>
			<HookField_Description>{p.description}</HookField_Description>
		</div>
	);
};
