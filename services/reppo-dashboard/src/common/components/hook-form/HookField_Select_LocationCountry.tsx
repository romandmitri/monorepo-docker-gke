import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { LocationCountryIsoCode } from "@/src/common/components/location/LocationCountryIsoCode.ts";
import { LocationCountrySelect } from "@/src/common/components/location/LocationCountrySelect.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Select_LocationCountry = (p: Props) => {
	const methods = useFormContext();
	const country = methods.watch(p.name) as LocationCountryIsoCode;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<LocationCountrySelect
				//
				isDisabled={p.isDisabled}
				countryIsoCode={country}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
