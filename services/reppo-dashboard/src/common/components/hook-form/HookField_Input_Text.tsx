import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { Input } from "@/src/common/components/shadcn/input.tsx";
import { HTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	className?: HTMLAttributes<any>["className"];
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	isFocus?: boolean;
	isOptional?: boolean;
	name: HookFieldName;
	nested?: ReactNode;
	placeholder?: string;
}

export const HookField_Input_Text = (p: Props) => {
	const methods = useFormContext();
	return (
		<HookField
			//
			className={p.className}
			isOptional={p.isOptional}
			name={p.name}
			label={p.label}
			description={p.description}
			nested={p.nested}
		>
			<Input
				{...methods.register(p.name)}
				autoFocus={p.isFocus}
				autoComplete={"off"}
				data-1p-ignore
				disabled={p.isDisabled}
				id={p.name}
				placeholder={p.placeholder}
			/>
		</HookField>
	);
};
