import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	content?: ReactNode;
}

export const HookForm_Description = (p: Props) => {
	if (!p.children && !p.content) return null;
	return <div className={"text-muted-foreground text-sm"}>{p.children ?? p.content}</div>;
};
