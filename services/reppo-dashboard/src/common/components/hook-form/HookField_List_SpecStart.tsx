import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { SpecStart_List } from "@/src/modules/agent-version/layout/simulation-runs/start/SpecStart_List.tsx";
import { AgentVersionWithBasics } from "@/src/modules/agent-version/type/AgentVersion.ts";
import { AgentWithBasics } from "@/src/modules/agent/type/Agent.ts";
import { ResourceWithActions } from "@/src/modules/perm/type/Resource.ts";
import { SimulationSpecStartInstruction } from "@/src/modules/simulation/type/spec/start/SimulationSpecStartInstruction.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled: boolean;
	name: HookFieldName;
	agent: AgentWithBasics & ResourceWithActions;
	version: AgentVersionWithBasics;
}

export const HookField_List_SpecStart = (p: Props) => {
	const methods = useFormContext();
	const values = methods.watch(p.name) as SimulationSpecStartInstruction[];

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<SpecStart_List
				//
				// isDisabled={p.isDisabled}
				agent={p.agent}
				version={p.version}
				instructions={values}
				onChange={(v) => {
					methods.setValue(p.name, v, setValueConfig);
				}}
			/>
		</HookField>
	);
};
