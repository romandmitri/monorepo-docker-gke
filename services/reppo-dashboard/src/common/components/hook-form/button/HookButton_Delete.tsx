import { HookButton_Submit } from "@/src/common/components/hook-form/button/HookButton_Submit.tsx";
import { ReactNode } from "react";

interface Props {
	caption?: ReactNode;
	children?: ReactNode;
}

export const HookButton_Delete = (p: Props) => {
	return <HookButton_Submit variant={"destructive"}>{p.children ?? p.caption ?? "Delete"}</HookButton_Submit>;
};
