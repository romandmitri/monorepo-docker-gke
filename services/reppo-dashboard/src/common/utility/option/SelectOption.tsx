import { MultiSelectOption } from "@/src/common/components/shadcn/multi-select.tsx";
import { LucideProps } from "lucide-react";
import { ComponentType, ReactNode } from "react";

export type SelectOptionValue = string;

export interface SelectOption<Value extends SelectOptionValue> {
	content?: ReactNode;
	value: Value;
	icon?: ComponentType<LucideProps>;
	isSelected?: boolean;
}

export interface SelectOptionResponse<Value extends SelectOptionValue> {
	caption: string;
	value: Value;
}

/** @deprecated TODO: reidenzon - If you want to use this, pass an icon getter. */
export const SelectOptionsFromResponse = <Value extends SelectOptionValue>(list?: SelectOptionResponse<Value>[]): SelectOption<Value>[] | undefined => {
	if (!list) return;
	return list.map((item): SelectOption<Value> => {
		return {
			content: item.caption,
			value: item.value,
		};
	});
};

export const getMultiSelectOptions = (list?: SelectOption<any>[]): MultiSelectOption[] => {
	if (!list) return [];
	return list.map((op) => getMultiSelectOption(op));
};

export const getMultiSelectOption = (op: SelectOption<string>): MultiSelectOption => {
	return {
		label: typeof op.content == "string" ? op.content : "ReactNode",
		value: op.value,
		icon: op.icon,
	};
};
