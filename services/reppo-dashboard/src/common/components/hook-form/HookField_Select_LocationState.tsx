import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { LocationCountryIsoCode } from "@/src/common/components/location/LocationCountryIsoCode.ts";
import { LocationStateIsoCode } from "@/src/common/components/location/LocationStateIsoCode.ts";
import { LocationStateSelect } from "@/src/common/components/location/LocationStateSelect.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
	country?: LocationCountryIsoCode;
}

export const HookField_Select_LocationState = (p: Props) => {
	const methods = useFormContext();
	const state = methods.watch(p.name) as LocationStateIsoCode;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<LocationStateSelect
				isDisabled={p.isDisabled}
				countryIsoCode={p.country}
				stateIsoCode={state}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
