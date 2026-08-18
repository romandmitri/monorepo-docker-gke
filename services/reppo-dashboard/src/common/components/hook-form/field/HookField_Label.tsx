import { HookFieldName } from "@/src/common/components/hook-form/field/HookFieldName.ts";
import { Label } from "@/src/common/components/shadcn/label.tsx";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	for?: HookFieldName;
	isOptional?: boolean;
}

export const HookField_Label = (p: Props) => {
	if (!p.children) return null;
	return (
		<Label htmlFor={p.for} className={"items-start"}>
			<span>{p.children}</span>
			{p.isOptional && <span className={"text-muted-foreground -mt-1 text-xs"}>{"optional"}</span>}
		</Label>
	);
};
