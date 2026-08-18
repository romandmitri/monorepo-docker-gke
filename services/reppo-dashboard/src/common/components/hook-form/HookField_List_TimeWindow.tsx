import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { TimeWindowList } from "@/src/modules/time-window/components/list/TimeWindowList.tsx";
import { TimeWindow } from "@/src/modules/time-window/type/TimeWindow.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled: boolean;
	name: HookFieldName;
}

export const HookField_List_TimeWindow = (p: Props) => {
	const methods = useFormContext();
	const timeWindows = methods.watch(p.name) as TimeWindow[];

	return (
		<HookField label={p.label} description={p.description} name={p.name}>
			<TimeWindowList
				//
				isDisabled={p.isDisabled}
				timeWindows={timeWindows}
				onChange={(v) => {
					methods.setValue(p.name, v, setValueConfig);
				}}
			/>
		</HookField>
	);
};
