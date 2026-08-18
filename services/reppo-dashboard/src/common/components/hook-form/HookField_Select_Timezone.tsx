import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { setValueConfig } from "@/src/common/components/hook-form/form/HookFormHelper.tsx";
import { ButtonGroup } from "@/src/common/components/shadcn/button-group.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/src/common/components/shadcn/select.tsx";
import { ThemeIcon } from "@/src/common/style/ThemeIcon.tsx";
import { TimeZone } from "@/src/common/utility/time/TimeZone.ts";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

const TIMEZONES_CANADA = [
	{ value: "America/St_Johns", label: "Newfoundland (NT)" },
	{ value: "America/Halifax", label: "Atlantic (AT)" },
	{ value: "America/Toronto", label: "Eastern (ET)" },
	{ value: "America/Winnipeg", label: "Central (CT)" },
	{ value: "America/Edmonton", label: "Mountain (MT)" },
	{ value: "America/Vancouver", label: "Pacific (PT)" },
];

const TIMEZONES_USA = [
	{ value: "America/New_York", label: "Eastern (ET)" },
	{ value: "America/Chicago", label: "Central (CT)" },
	{ value: "America/Denver", label: "Mountain (MT)" },
	{ value: "America/Phoenix", label: "Arizona (MT - no DST)" },
	{ value: "America/Los_Angeles", label: "Pacific (PT)" },
	{ value: "America/Anchorage", label: "Alaska (AKT)" },
	{ value: "Pacific/Honolulu", label: "Hawaii (HT)" },
	{ value: "America/Puerto_Rico", label: "Atlantic (AST)" },
	{ value: "Pacific/Pago_Pago", label: "Samoa (SST)" },
];

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	isOptional?: boolean;
	name: HookFieldName;
}

export const HookField_Select_Timezone = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name) as TimeZone;

	return (
		<HookField
			//
			label={p.label}
			description={p.description}
			name={p.name}
			isOptional={p.isOptional}
		>
			<ButtonGroup>
				<Select
					//
					value={value}
					onValueChange={(v) => methods.setValue(p.name, v, setValueConfig)}
					disabled={p.isDisabled}
				>
					<SelectTrigger className="">
						<SelectValue placeholder="--" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Canada</SelectLabel>
							{TIMEZONES_CANADA.map((tz) => (
								<SelectItem key={tz.value} value={tz.value}>
									{tz.label}
								</SelectItem>
							))}
						</SelectGroup>
						<SelectGroup>
							<SelectLabel>United States</SelectLabel>
							{TIMEZONES_USA.map((tz) => (
								<SelectItem key={tz.value} value={tz.value}>
									{tz.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
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
