import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { useFormContext } from "react-hook-form";

interface Props {
	isWarning?: boolean;
}

export const HookForm_Dirty = (p: Props) => {
	const methods = useFormContext();
	const formState = methods.formState; // register!

	const isWarning = p.isWarning ?? false;
	const isShow = isWarning && formState.isDirty;
	if (!isShow) return null;

	// consoleLog("HookForm_Dirty", formState, formState.dirtyFields);

	return <Badge variant={"outline-warning"}>{"Modified"}</Badge>;
};
