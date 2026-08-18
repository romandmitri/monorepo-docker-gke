import { AiModelSelect } from "@/src/common/adapters/ai/components/AiModelSelect.tsx";
import { AiModel } from "@/src/common/adapters/ai/type/AiModel.ts";
import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Select_AiModel = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) as AiModel;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<AiModelSelect
				//
				isDisabled={p.isDisabled}
				value={value ?? null}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
