import { LucideProps } from "lucide-react";
import { ComponentType, ReactNode } from "react";

interface Props {
	icon?: ComponentType<LucideProps>;
	title?: ReactNode;
}

export const HookForm_Title = (p: Props) => {
	if (!p.title) return null;
	const TitleIcon = p.icon;
	return (
		<div className={"flex flex-row items-center gap-2 text-lg font-normal"}>
			{TitleIcon && <TitleIcon className={"size-5"} />}
			{p.title}
		</div>
	);
};
