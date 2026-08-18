import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { PhoneInput } from "@/src/common/components/shadcn/phone-input.tsx";
import { getPhoneNumberNumerFormats } from "@/src/modules/phone-number/type/PhoneNumberNumber.ts";
import type { E164Number } from "libphonenumber-js";
import { XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { z } from "zod";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	name: HookFieldName;
	buttonText?: string;
}

export const HookField_Input_Tags_Phone = (p: Props) => {
	const methods = useFormContext<FieldValues>();
	const [pendingValue, setPendingValue] = useState<E164Number | "">("");
	const [error, setError] = useState<string | null>(null);

	const currentValue: string[] = methods.watch(p.name) || [];

	const addPendingValue = () => {
		const trimmed = pendingValue.trim();
		if (!trimmed) return;

		if (!z.e164().safeParse(trimmed).success) {
			setError("Please enter a valid phone number");
			return;
		}

		if (currentValue.includes(trimmed)) {
			setError("Phone number already added");
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
				<div className="flex gap-2">
					<PhoneInput
						value={pendingValue || undefined}
						onChange={(value) => {
							setPendingValue(value ?? "");
							setError(null);
						}}
						disabled={p.isDisabled}
						className="flex-1"
					/>
					<Button type="button" variant="secondary" onClick={addPendingValue} disabled={p.isDisabled || !pendingValue}>
						{p.buttonText ?? "Add"}
					</Button>
				</div>
				{error && <p className="text-destructive text-sm">{error}</p>}
				{currentValue.length > 0 && (
					<div className="flex flex-wrap items-center gap-2">
						{currentValue.map((item, idx) => {
							return (
								<Badge key={`${idx}-${item}`} variant="secondary" className={"p-0 pl-2"}>
									{getPhoneNumberNumerFormats(item)?.pretty ?? item}
									<Button disabled={p.isDisabled} onClick={() => removeValue(item)} variant={"ghost"} size={"icon-xs"}>
										<XIcon />
									</Button>
								</Badge>
							);
						})}
					</div>
				)}
			</div>
		</HookField>
	);
};
