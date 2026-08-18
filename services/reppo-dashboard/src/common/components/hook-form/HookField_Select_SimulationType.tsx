import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { SimulationTypeToggle } from "@/src/modules/simulation/components/SimulationTypeToggle.tsx";
import { SimulationType } from "@/src/modules/simulation/type/SimulationType.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Select_SimulationType = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) as SimulationType;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<SimulationTypeToggle
				//
				value={value}
				isDisabled={p.isDisabled}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
