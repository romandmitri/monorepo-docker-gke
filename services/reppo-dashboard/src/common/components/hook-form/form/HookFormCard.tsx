import { Card } from "@/src/common/components/shadcn/card.tsx";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

export const HookFormCard = (p: Props) => {
	// TODO: reidenzon - Use another more-subtle wrapper style?!
	return <Card className={"w-full"}>{p.children}</Card>;
};
