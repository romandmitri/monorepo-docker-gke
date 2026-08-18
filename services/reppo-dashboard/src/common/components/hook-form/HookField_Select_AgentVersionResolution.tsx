import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { AgentVersion_Resolution_Select } from "@/src/modules/agent-version/components/AgentVersion_Resolution_Select.tsx";
import { AgentVersionResolution } from "@/src/modules/agent-version/type/AgentVersionResolution.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Select_AgentVersionResolution = (p: Props) => {
	const methods = useFormContext();
	const resolution = methods.watch(p.name) as AgentVersionResolution;

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<AgentVersion_Resolution_Select
				//
				isDisabled={p.isDisabled}
				resolution={resolution}
				onChange={(v) => methods.setValue(p.name, v, setValueConfig)}
			/>
		</HookField>
	);
};
