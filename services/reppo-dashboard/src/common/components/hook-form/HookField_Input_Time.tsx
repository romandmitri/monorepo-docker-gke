import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { ButtonGroup } from "@/src/common/components/shadcn/button-group.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { TimeInput } from "@/src/common/components/shadcn/time-input.tsx";
import { ThemeIcon } from "@/src/common/style/ThemeIcon.tsx";
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

export const HookField_Input_Time = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) as string;
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
			<ButtonGroup>
				<TimeInput
					//
					{...methods.register(p.name)}
					autoFocus={p.isFocus}
					autoComplete={"off"}
					data-1p-ignore
					disabled={p.isDisabled}
					id={p.name}
				/>
				{p.isOptional && (
					<Button
						//
						disabled={p.isDisabled || !value}
						variant={"outline"}
						size={"icon"}
						onClick={() => methods.setValue(p.name, null, setValueConfig)}
					>
						<ThemeIcon.Common_Clear />
					</Button>
				)}
			</ButtonGroup>
		</HookField>
	);
};
