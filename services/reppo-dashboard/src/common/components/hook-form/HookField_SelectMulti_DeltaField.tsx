import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { DeltaField } from "@/src/modules/simulation/type/spec/trigger/version-delta-hard/type/DeltaField.ts";
import { DeltaFieldMultiSelect } from "@/src/modules/simulation/type/spec/trigger/version-delta-hard/type/DeltaFieldMultiSelect.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_SelectMulti_DeltaField = (p: Props) => {
	const methods = useFormContext();
	const values = methods.watch(p.name) as DeltaField[];

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<DeltaFieldMultiSelect
				//
				isDisabled={p.isDisabled}
				values={values}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
