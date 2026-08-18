import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/src/common/components/shadcn/input-group.tsx";
import { XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
	placeholder?: string;
	validate?: (value: string) => boolean;
	validationMessage?: string;
	formatDisplay?: (value: string) => string;
	buttonText?: string;
}

export const HookField_Input_Tags = (p: Props) => {
	const methods = useFormContext<FieldValues>();
	const [pendingValue, setPendingValue] = useState("");
	const [error, setError] = useState<string | null>(null);

	const currentValue: string[] = methods.watch(p.name) || [];

	const addPendingValue = () => {
		const trimmed = pendingValue.trim();
		if (!trimmed) return;

		if (p.validate && !p.validate(trimmed)) {
			setError(p.validationMessage || "Invalid value");
			return;
		}

		if (currentValue.includes(trimmed)) {
			setError("Value already exists");
			return;
		}

		const newValues = [...currentValue, trimmed];
		methods.setValue(p.name, newValues, setValueConfig);
		setPendingValue("");
		setError(null);
	};

	const removeValue = (valueToRemove: string) => {
		const newValues = currentValue.filter((v) => v !== valueToRemove);
		methods.setValue(p.name, newValues, setValueConfig);
	};

	return (
		<HookField name={p.name} label={p.label} description={p.description}>
			<div className="flex flex-col gap-2">
				<InputGroup>
					<InputGroupInput
						value={pendingValue}
						onChange={(e) => {
							setPendingValue(e.target.value);
							setError(null);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								addPendingValue();
							} else if (e.key === "," || e.key === " ") {
								e.preventDefault();
								addPendingValue();
							}
						}}
						placeholder={p.placeholder}
						disabled={p.isDisabled}
						autoComplete="off"
						data-1p-ignore
					/>
					<InputGroupAddon align="inline-end">
						<InputGroupButton variant="secondary" onClick={addPendingValue} disabled={p.isDisabled}>
							{p.buttonText ?? "Add"}
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				{error && <p className="text-destructive text-sm">{error}</p>}
				{currentValue.length > 0 && (
					<div className="flex flex-wrap items-center gap-2">
						{currentValue.map((item, idx) => (
							<Badge key={`${idx}-${item}`} variant="secondary" className={"p-0 pl-2"}>
								{p.formatDisplay?.(item) ?? item}
								<Button disabled={p.isDisabled} onClick={() => removeValue(item)} variant={"ghost"} size={"icon-xs"}>
									<XIcon />
								</Button>
							</Badge>
						))}
					</div>
				)}
			</div>
		</HookField>
	);
};
