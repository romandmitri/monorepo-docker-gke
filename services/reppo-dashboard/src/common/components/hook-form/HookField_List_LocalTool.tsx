import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { LocalToolList } from "@/src/modules/agent-version/type/common/tool/components/list/LocalToolList.tsx";
import { LocalTool } from "@/src/modules/agent-version/type/common/tool/LocalTool.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled: boolean;
	name: HookFieldName;
}

export const HookField_List_LocalTool = (p: Props) => {
	const methods = useFormContext();
	const tools = methods.watch(p.name) as LocalTool[];

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<LocalToolList
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
