import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { Input } from "@/src/common/components/shadcn/input.tsx";
import { HTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	className?: HTMLAttributes<any>["className"];
	label?: ReactNode;
	description?: ReactNode;
	isAutoComplete?: boolean;
	isDisabled?: boolean;
	isFocus?: boolean;
	name: HookFieldName;
	placeholder?: string;
}

export const HookField_Input_Email = (p: Props) => {
	const methods = useFormContext();
	const isAutoComplete = p.isAutoComplete ?? true;
	return (
		<HookField
			//
			className={p.className}
			name={p.name}
			label={p.label}
			description={p.description}
		>
			<Input
				{...methods.register(p.name)}
				autoFocus={p.isFocus}
				autoComplete={isAutoComplete ? "on" : "off"}
				disabled={p.isDisabled}
				id={p.name}
				placeholder={p.placeholder}
				type={"email"}
			/>
		</HookField>
	);
};
