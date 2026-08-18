import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { PhoneNumber_Type_Select } from "@/src/modules/phone-number/components/PhoneNumber_Type_Select.tsx";
import { PhoneNumberType } from "@/src/modules/phone-number/type/PhoneNumberType.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	isDisabled?: boolean;
	name: HookFieldName;
	label?: ReactNode;
	description?: ReactNode;
	nested?: ReactNode;
}

export const HookField_Select_PhoneNumberType = (p: Props) => {
	const methods = useFormContext();
	const type = methods.watch(p.name) as PhoneNumberType;

	return (
		<HookField
			//
			name={p.name}
			label={p.label}
			description={p.description}
			nested={p.nested}
		>
			<PhoneNumber_Type_Select
				//
				isDisabled={p.isDisabled}
				type={type}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
