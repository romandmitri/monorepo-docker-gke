import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/src/common/components/shadcn/alert-dialog.tsx";
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
}

export const AlertDialogContent_Custom = (p: Props) => {
	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{p.title ?? "Warning"}</AlertDialogTitle>
				<AlertDialogDescription>{p.description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>{p.cancelContent ?? "Cancel"}</AlertDialogCancel>
				<AlertDialogAction onClick={p.onContinue} variant={p.continueVariant ?? "destructive"}>
					{p.continueContent ?? "Continue"}
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
};
