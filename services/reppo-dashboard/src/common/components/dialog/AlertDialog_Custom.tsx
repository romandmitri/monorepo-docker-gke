import { AlertDialogContent_Custom } from "@/src/common/components/dialog/AlertDialogContent_Custom.tsx";
import { AlertDialog, AlertDialogTrigger } from "@/src/common/components/shadcn/alert-dialog.tsx";
import { buttonVariants } from "@/src/common/components/shadcn/button.tsx";
import type { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

interface Props {
	title?: ReactNode;
	description?: ReactNode;
	cancelContent?: ReactNode;
	continueContent?: ReactNode;
	continueVariant?: VariantProps<typeof buttonVariants>["variant"];
	onContinue: () => void;
	children?: ReactNode;
}

export const AlertDialog_Custom = (p: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{p.children}</AlertDialogTrigger>
			<AlertDialogContent_Custom
				title={p.title}
				description={p.description}
				cancelContent={p.cancelContent ?? "Cancel"}
				continueContent={p.continueContent ?? "Continue"}
				continueVariant={p.continueVariant ?? "default"}
				onContinue={p.onContinue}
			/>
		</AlertDialog>
	);
};
