import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { HookField_Input_Text } from "@/src/common/components/hook-form/HookField_Input_Text.tsx";
import { withHtml } from "@/src/common/utility/http/Raw.tsx";
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
	placeholder?: string;
}

export const HookField_Input_GroupSlug = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name);

	// TODO: reidenzon - Call API to see if taken.

	return (
		<HookField_Input_Text
			//
			className={p.className}
			name={p.name}
			label={p.label}
			description={withHtml(`The workspace URL will be:<br/><b>dashboard/${value || "..."}</b>`)}
		/>
	);
};
