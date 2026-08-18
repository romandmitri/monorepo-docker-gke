import { Label } from "@/src/common/components/shadcn/label.tsx";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

export const HookSection_Label = (p: Props) => {
	if (!p.children) return null;
	return <Label>{p.children}</Label>;
};
