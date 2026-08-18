import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { Checkbox } from "@/src/common/components/shadcn/checkbox.tsx";
import { Label } from "@/src/common/components/shadcn/label.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	caption?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
}

export const HookField_Checkbox = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name);

	return (
		<HookField label={p.label} name={p.name} description={p.description}>
			<div className={"flex items-start gap-3"}>
				<Checkbox
					/*{...methods.register(p.name)}*/
					id={p.name}
					disabled={p.isDisabled}
					className={"cursor-pointer"}
					checked={value}
					onCheckedChange={(v) => methods.setValue(p.name, v, setValueConfig)}
				/>
				{p.caption && (
					<Label htmlFor={p.name} className={"text-muted-foreground cursor-pointer pt-0.25"}>
						{p.caption}
					</Label>
				)}
			</div>
		</HookField>
	);
};
