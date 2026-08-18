import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { Switch2 } from "@/src/common/components/switch/Switch2.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	name: HookFieldName;
	label?: ReactNode;
	description?: ReactNode;
	actions?: ReactNode[];
	caption?: ReactNode;
	isDisabled?: boolean;
	nested?: ReactNode;
}

export const HookField_Switch = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name);

	return (
		<HookField
			//
			name={p.name}
			label={p.label}
			description={p.description}
			actions={p.actions}
			nested={p.nested}
		>
			<Switch2
				isChecked={value}
				isDisabled={p.isDisabled}
				onChecked={(v) => {
					methods.setValue(p.name, v, setValueConfig);
				}}
				caption={p.caption}
			/>
		</HookField>
	);
};
