import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { AgentVersionPurposeSelect } from "@/src/modules/agent-version/components/AgentVersionPurposeSelect.tsx";
import { AgentVersionPurpose } from "@/src/modules/agent-version/type/AgentVersionPurpose.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Select_AgentVersionPurpose = (p: Props) => {
	const methods = useFormContext();
	const purpose = methods.watch(p.name) as AgentVersionPurpose;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<AgentVersionPurposeSelect
				//
				purpose={purpose ?? null}
				isDisabled={p.isDisabled}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
