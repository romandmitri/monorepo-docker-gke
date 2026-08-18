import { HookFormContext, HookFormContextInterface } from "@/src/common/components/hook-form/form/HookFormContext.ts";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	isLoading?: boolean;
}

export const HookFormProvider = (p: Props) => {
	const context: HookFormContextInterface = {
		isLoading: p.isLoading ?? false,
	};
	return <HookFormContext.Provider value={context}>{p.children}</HookFormContext.Provider>;
};
