import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { BrainTool } from "@/src/modules/brain/type/tool/BrainTool.ts";
import { BrainToolList } from "@/src/modules/brain/type/tool/components/list/BrainToolList.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled: boolean;
	name: HookFieldName;
}

export const HookField_List_BrainTool = (p: Props) => {
	const methods = useFormContext();
	const tools = methods.watch(p.name) as BrainTool[];

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<BrainToolList
				//
				isDisabled={p.isDisabled}
				tools={tools}
				onChange={(v) => {
					methods.setValue(p.name, v, setValueConfig);
				}}
			/>
		</HookField>
	);
};
