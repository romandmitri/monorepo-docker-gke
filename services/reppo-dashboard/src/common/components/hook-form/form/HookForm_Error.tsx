import { ApiResponse, ApiResponseServerError } from "@/src/common/adapters/axios/type/ApiResponse.ts";
import { HookForm_Error_Display } from "@/src/common/components/hook-form/form/HookForm_Error_Display.tsx";
import { consoleLog } from "@/src/common/utility/log/Log.ts";
import { AxiosError } from "axios";
import { Fragment } from "react";
import { FieldValues, Message, useFormContext, UseFormReturn } from "react-hook-form";

interface Props {}

export const HookForm_Error = (p: Props) => {
	const methods = useFormContext();
	const formState = methods.formState; // register!
	const rootErrors = formState.errors.root;

	// TODO: Reidenzon - Loop errors?! ...they can be nested.
	if (Object.keys(formState.errors).length) {
		consoleLog("HookForm_Error", formState.errors, rootErrors);
	}

	return (
		<Fragment>
			<HookForm_Error_Display error={rootErrors?.message} />
			{/*<DeveloperData data={rootErrors} />*/}
		</Fragment>
	);
};

export const onMutationError = <V extends FieldValues>(err: Error, methods: UseFormReturn<V>) => {
	const message = parseError(err);
	if (message) methods.setError("root", { message: message });
};

const parseError = (err: Error): Message | undefined => {
	console.error("parseError", err);
	if (err instanceof AxiosError) {
		const data = err.response?.data;

		const dataError = data as ApiResponseServerError;
		if (dataError.message ?? dataError.error) {
			return dataError.message ?? dataError.error;
		}

		const dataResponse = data as ApiResponse<any>;
		const dataResponseMessages = dataResponse?.messages ?? [];
		if (dataResponseMessages.length) {
			return dataResponseMessages.map((m) => m.content).join(" ");
		}
	}
	return err.message;
};
