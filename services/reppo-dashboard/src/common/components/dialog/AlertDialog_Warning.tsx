import { AlertDialogContent_Warning } from "@/src/common/components/dialog/AlertDialogContent_Warning.tsx";
import { AlertDialog, AlertDialogTrigger } from "@/src/common/components/shadcn/alert-dialog.tsx";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	onContinue: () => void;
}

export const AlertDialog_Warning = (p: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{p.children}</AlertDialogTrigger>
			<AlertDialogContent_Warning onContinue={p.onContinue} />
		</AlertDialog>
	);
};
