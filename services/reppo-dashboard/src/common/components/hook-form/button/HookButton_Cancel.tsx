import { Button } from "@/src/common/components/shadcn/button.tsx";
import { ReactNode } from "react";

interface Props {
	caption?: ReactNode;
	children?: ReactNode;
	onClick: () => void;
}

export const HookButton_Cancel = (p: Props) => {
	return (
		<Button onClick={p.onClick} type={"button"} variant={"ghost"}>
			{p.children ?? p.caption ?? "Cancel"}
		</Button>
	);
};
