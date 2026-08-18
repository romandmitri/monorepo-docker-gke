import { createContext, useContext } from "react";

export interface HookFormContextInterface {
	isLoading: boolean;
}

export const HookFormContext = createContext<HookFormContextInterface | undefined>(undefined);

export const useHookForm = () => {
	const ctx = useContext(HookFormContext);
	if (!ctx) throw new Error("useHookForm() is NOT in <HookFormProvider />");
	return ctx;
};
