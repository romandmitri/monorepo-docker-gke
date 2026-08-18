import { Select, SelectContent, SelectTrigger } from "@/src/common/components/shadcn/select.tsx";
import { SelectOption, SelectOptionValue } from "@/src/common/utility/option/SelectOption.tsx";
import { SelectItem } from "@radix-ui/react-select";

interface Props<Value extends SelectOptionValue = any> {
	isDisabled?: boolean;
	onChange?: (v: Value) => void;
	options: SelectOption<Value>[];
	value: Value;
}

export const SelectStatic = (p: Props) => {
	const selectedOption = p.options.find((op) => op.value == p.value);
	return (
		<Select value={p.value} onValueChange={p.onChange}>
			<SelectTrigger disabled={p.isDisabled} className={"w-full"}>
				{selectedOption?.content}
				<div></div>
			</SelectTrigger>
			<SelectContent>
				{p.options.map((option) => {
					return (
						<SelectItem key={option.value} value={option.value}>
							{option.content}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};
