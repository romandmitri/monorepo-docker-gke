import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

/** @deprecated TODO: reidenzon - Use LayoutGrid instead?! */
export const HookForm_Column = (p: Props) => {
	return <div className={"grid max-w-full auto-cols-auto gap-6 px-6"}>{p.children}</div>;
};
