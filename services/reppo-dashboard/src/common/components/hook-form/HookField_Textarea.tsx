import { HookField } from "@/src/common/components/hook-form/field/HookField.tsx";
import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { Textarea } from "@/src/common/components/shadcn/textarea.tsx";
import { PromptLengthLimits } from "@/src/common/utility/prompt/PromptLength.ts";
import { PromptLengthIndicator } from "@/src/common/utility/prompt/PromptLengthIndicator.tsx";
import { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	label?: ReactNode;
	description?: ReactNode;
	isDisabled?: boolean;
	isFocus?: boolean;
	isOptional?: boolean;
	isPrompt?: boolean;
	className?: HTMLAttributes<any>["className"];
	name: HookFieldName;
	placeholder?: string;
	promptLimits?: PromptLengthLimits;
	actions?: ReactNode[];
}

export const HookField_Textarea = (p: Props) => {
	const methods = useFormContext();
	const value = methods.watch(p.name);

	const actions = [...(p.actions ?? [])];
	if (p.isPrompt) actions.push(<PromptLengthIndicator prompt={value} limits={p.promptLimits} />);

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if ((event.ctrlKey || event.metaKey) && event.key == "Enter") {
			const target = event.currentTarget;
			const form = target.form;
			form?.requestSubmit();
		}
	};

	return (
		<HookField
			//
			label={p.label}
			description={p.description}
			isOptional={p.isOptional}
			name={p.name}
			actions={actions}
		>
			<Textarea
				{...methods.register(p.name)}
				autoFocus={p.isFocus}
				autoComplete={"off"}
				className={p.className}
				data-1p-ignore
				disabled={p.isDisabled}
				id={p.name}
				onKeyDown={handleKeyDown}
				placeholder={p.placeholder}
			/>
		</HookField>
	);
};
