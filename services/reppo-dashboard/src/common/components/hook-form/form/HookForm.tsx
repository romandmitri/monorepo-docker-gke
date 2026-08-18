import { AlertDialogContent_Warning } from "@/src/common/components/dialog/AlertDialogContent_Warning.tsx";
import { HookFormCard } from "@/src/common/components/hook-form/form/HookFormCard.tsx";
import { HookFormProvider } from "@/src/common/components/hook-form/form/HookFormProvider.tsx";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { AlertDialog } from "@/src/common/components/shadcn/alert-dialog.tsx";
import React, { HTMLAttributes, ReactNode, useRef, useState } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FieldValues, FormProvider } from "react-hook-form";

interface Props<V extends FieldValues> {
	className?: HTMLAttributes<any>["className"];
	children?: ReactNode;
	isCard?: boolean;
	isLoading?: boolean;
	isSubmitWarning?: boolean;
	methods: UseFormReturn<V>;
	onSubmit: (data: V) => Promise<void>;
}

export const HookForm = <V extends FieldValues>(p: Props<V>) => {
	const methods = p.methods;
	const refForm = useRef<HTMLFormElement>(null);

	const isSubmitWarning = p.isSubmitWarning ?? false;
	const [isWarning, setIsWarning] = useState<boolean>(false);
	const [data, setData] = useState<V>();

	let content = p.children;
	if (p.isCard) content = <HookFormCard>{content}</HookFormCard>;

	const handleSubmit: SubmitHandler<V> = async (data, event) => {
		const target = event?.target ?? event?.currentTarget;
		// consoleLog("HookForm.handleSubmit", target, refForm.current, isSubmitWarning, isWarning);
		if (target != refForm.current) return;
		if (isSubmitWarning && !isWarning) {
			setData(data);
			setIsWarning(true);
			return;
		}
		// consoleLog("HookForm.handleSubmit.onSubmit!!!");
		await p.onSubmit(data);
	};

	const handleContinue = async () => {
		await p.onSubmit(data!);
	};

	return (
		<HookFormProvider isLoading={p.isLoading}>
			<FormProvider {...methods}>
				<form
					//
					className={cn("flex flex-col gap-6", p.className)}
					ref={refForm}
					onSubmit={methods.handleSubmit(handleSubmit)}
				>
					{content}
					{isSubmitWarning && (
						<AlertDialog open={isWarning} onOpenChange={setIsWarning}>
							<AlertDialogContent_Warning onContinue={handleContinue} />
						</AlertDialog>
					)}
				</form>
			</FormProvider>
		</HookFormProvider>
	);
};
