import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Label } from "@/src/common/components/shadcn/label.tsx";
import { Slider } from "@/src/common/components/shadcn/slider.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

type Props = {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	isFocus?: boolean;
	isOptional?: boolean;
	name: HookFieldName;
	nested?: ReactNode;
} & HookField_Slider_Settings;

export interface HookField_Slider_Settings {
	default: number;
	format?: (v: number) => ReactNode;
	min: number;
	max: number;
	step: number;
}

export const HookField_Slider = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) ?? p.default;
	return (
		<HookField
			//
			label={p.label}
			description={p.description}
			isOptional={p.isOptional}
			name={p.name}
			nested={p.nested}
		>
			<div className={"flex flex-row items-center gap-4"}>
				<Slider
					//
					autoFocus={p.isFocus}
					data-1p-ignore
					disabled={p.isDisabled}
					id={p.name}
					min={p.min}
					max={p.max}
					step={p.step}
					value={[value]}
					onValueChange={(values) => methods.setValue(p.name, values[0], setValueConfig)}
				/>
				{p.format && Number.isFinite(value) && (
					<Label
						className={cn(
							//
							"min-w-16 justify-end whitespace-nowrap",
							{ "text-muted-foreground": p.isDisabled },
						)}
					>
						{p.format(value)}
					</Label>
				)}
			</div>
		</HookField>
	);
};

export const zNumberFromSlider = (p: HookField_Slider_Settings): z.ZodNumber => {
	return z.number().min(p.min).max(p.max);
};
