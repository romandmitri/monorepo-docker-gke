import { AlertDialogContent_Custom } from "@/src/common/components/dialog/AlertDialogContent_Custom.tsx";

interface Props {
	onContinue: () => void;
}

export const AlertDialogContent_Warning = (p: Props) => {
	return (
		<AlertDialogContent_Custom
			title={"Warning"}
			description={"This change is permanent. Are you sure?"}
			cancelContent={"Cancel"}
			continueContent={"Continue"}
			continueVariant={"destructive"}
			onContinue={p.onContinue}
		/>
	);
};
