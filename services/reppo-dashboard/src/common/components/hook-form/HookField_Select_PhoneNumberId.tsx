import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { GetPhoneNumbersRequestFilter } from "@/src/modules/phone-number/api/api-get-phone-numbers.ts";
import { PhoneNumberIdRadio } from "@/src/modules/phone-number/components/PhoneNumberIdRadio.tsx";
import { PhoneNumberId } from "@/src/modules/phone-number/type/PhoneNumberId.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	filter: GetPhoneNumbersRequestFilter;
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Select_PhoneNumberId = (p: Props) => {
	const methods = useFormContext();
	const phoneNumberId = methods.watch(p.name) as PhoneNumberId;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<PhoneNumberIdRadio
				filter={p.filter}
				phoneNumberId={phoneNumberId}
				isDisabled={p.isDisabled}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
