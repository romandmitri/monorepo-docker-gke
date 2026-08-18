import { useHookForm } from "@/src/common/components/hook-form/form/HookFormContext.ts";
import { Button, buttonVariants } from "@/src/common/components/shadcn/button.tsx";
import type { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	caption?: ReactNode;
	children?: ReactNode;
	isDisabled?: boolean;
	isDisableClean?: boolean;
	isHideClean?: boolean;
	isLoading?: boolean;
	tooltip?: string;
} & VariantProps<typeof buttonVariants>;

export const HookButton_Submit = (p: Props) => {
	const hookForm = useHookForm();
	const methods = useFormContext();
	const formState = methods.formState; // register!

	const isDirty = formState.isDirty;
	const isDisableClean = p.isDisableClean ?? true;
	const isDisabled = p.isDisabled || (!isDirty && isDisableClean);
	const isHideClean = p.isHideClean ?? false;

	if (!isDirty && isHideClean) return null;

	return (
		<Button
			//
			disabled={isDisabled}
			isLoading={p.isLoading || formState.isSubmitting || hookForm.isLoading}
			type={"submit"}
			size={p.size}
			variant={p.variant}
			tooltipHtml={p.tooltip}
		>
			{p.children ?? p.caption ?? "Save"}
		</Button>
	);
};
