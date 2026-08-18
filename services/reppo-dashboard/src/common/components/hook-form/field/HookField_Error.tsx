import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { useFormContext } from "react-hook-form";

interface Props {
	name: HookFieldName;
}

export const HookField_Error = (p: Props) => {
	const methods = useFormContext();
	const fieldState = methods.getFieldState(p.name, methods.formState); // register
	const error = fieldState.error;

	const isShow = fieldState.invalid || fieldState.isTouched || fieldState.isDirty;

	// consoleLog("HookField_Error", p.name, fieldState);

	if (!isShow) return null;
	if (!error) return null;

	return <p className={"text-destructive text-sm"}>{error.message}</p>;
};
