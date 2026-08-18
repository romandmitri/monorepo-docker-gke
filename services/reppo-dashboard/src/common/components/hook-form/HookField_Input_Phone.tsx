import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { PhoneInput } from "@/src/common/components/shadcn/phone-input.tsx";
import { DeveloperData } from "@/src/modules/developer/component/DeveloperData.tsx";
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
	placeholder?: string;
	actions?: ReactNode[];
}

export const HookField_Input_Phone = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name);

	return (
		<HookField
			//
			className={p.className}
			label={p.label}
			description={p.description}
			isOptional={p.isOptional}
			name={p.name}
			actions={p.actions}
		>
			<PhoneInput
				//{...methods.register(p.name)}
				autoFocus={p.isFocus}
				autoComplete={"off"}
				data-1p-ignore
				disabled={p.isDisabled}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
				placeholder={p.placeholder}
				value={value}
			/>
			<DeveloperData isDev data={value} />
		</HookField>
	);
};
