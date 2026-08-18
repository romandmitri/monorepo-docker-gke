import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { LocalToolType_MultiSelect } from "@/src/modules/agent-version/type/common/tool/components/LocalToolType_MultiSelect.tsx";
import { LocalToolType } from "@/src/modules/agent-version/type/common/tool/LocalToolType.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_SelectMulti_LocalToolType = (p: Props) => {
	const methods = useFormContext();
	const values = methods.watch(p.name) as LocalToolType[];

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<LocalToolType_MultiSelect
				//
				isDisabled={p.isDisabled}
				values={values}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
