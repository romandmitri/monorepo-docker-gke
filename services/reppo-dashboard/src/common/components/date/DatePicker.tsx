import { ButtonGroup } from "@/src/common/components/shadcn/button-group.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { Calendar } from "@/src/common/components/shadcn/calendar.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/common/components/shadcn/popover.tsx";
import { ThemeIcon } from "@/src/common/style/ThemeIcon.tsx";
import { DateString, DateStringFormat } from "@/src/common/utility/time/DateString.ts";
import { format, parse } from "date-fns";
import { useState } from "react";

interface Props {
	isDisabled?: boolean;
	isOptional?: boolean;
	placeholder?: string;
	tooltip?: string;
	value: DateString | undefined;
	onChange: (value: DateString | undefined) => void;
}

export const DatePicker = (p: Props) => {
	const value = p.value || undefined;
	const date = value ? parse(value, DateStringFormat, new Date()) : undefined;
	const isValue = Boolean(date);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<ButtonGroup>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						//
						disabled={p.isDisabled}
						variant={"outline"}
						className={"items-center justify-between"}
						tooltipHtml={p.tooltip}
					>
						{isValue && value}
						{!isValue && <span className={"text-muted-foreground font-normal"}>{p.placeholder || "--"}</span>}
						<ThemeIcon.Common_Dropdown />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={"w-auto overflow-hidden p-0"} align={"start"}>
					<Calendar
						//
						disabled={p.isDisabled}
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(v) => {
							if (!v) return;
							p.onChange(format(v, DateStringFormat));
							setIsOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
			{p.isOptional && (
				<Button
					//
					disabled={p.isDisabled || !value}
					variant={"outline"}
					size={"icon"}
					onClick={() => {
						p.onChange(undefined);
						setIsOpen(false);
					}}
				>
					<ThemeIcon.Common_Clear />
				</Button>
			)}
		</ButtonGroup>
	);
};
