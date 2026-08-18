import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { AgentTypeSelect } from "@/src/modules/agent/components/AgentTypeSelect.tsx";
import { AgentType } from "@/src/modules/agent/type/AgentType.ts";
import { GroupId } from "@/src/modules/group/type/GroupId.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
	groupId: GroupId;
}

export const HookField_Select_AgentType = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) as AgentType;

	return (
		<HookField
			//
			label={p.label}
			description={p.description}
			name={p.name}
			className={"max-w-2xs"}
		>
			<AgentTypeSelect
				//
				type={value}
				isDisabled={p.isDisabled}
				groupId={p.groupId}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
