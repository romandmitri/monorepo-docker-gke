import { Button } from "@/src/common/components/shadcn/button.tsx";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	caption?: ReactNode;
	children?: ReactNode;
}

export const HookButton_Reset = (p: Props) => {
	const methods = useFormContext();
	const formState = methods.formState; // register!

	const handleReset = async () => {
		methods.reset();
	};

	if (!formState.isDirty) return null;

	return (
		<Button onClick={handleReset} type={"button"} variant={"ghost"}>
			{p.children ?? p.caption ?? "Reset"}
		</Button>
	);
};
