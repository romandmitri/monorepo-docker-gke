import { DatePicker } from "@/src/common/components/date/DatePicker.tsx";
import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { DateString } from "@/src/common/utility/time/DateString.ts";
import { HTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	className?: HTMLAttributes<any>["className"];
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	isFocus?: boolean;
	isOptional?: boolean;
	name: HookFieldName;
	nested?: ReactNode;
}

export const HookField_Date_Calendar = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) as DateString | undefined;

	return (
		<HookField
			//
			className={p.className}
			isOptional={p.isOptional}
			name={p.name}
			label={p.label}
			description={p.description}
			nested={p.nested}
		>
			<DatePicker
				//
				isDisabled={p.isDisabled}
				isOptional={p.isOptional}
				value={value}
				onChange={(value) => {
					methods.setValue(p.name, value, setValueConfig);
				}}
			/>
		</HookField>
	);
};
